<?php

namespace Narsil\Tables\Filters;

#region USE

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Narsil\Tables\Constants\SQL;
use Narsil\Tables\Constants\Types;
use Narsil\Tables\Services\TableService;
use Narsil\Tables\Structures\ModelColumn;

#endregion

class SearchFilter
{
    #region CONSTRUCTOR

    /**
     * @param Request $request
     * @param Builder $query
     *
     * @return void
     */

    public function __construct(Request $request, Builder $query)
    {
        $this->request = $request;
        $this->query = $query;

        $this->modelColumns = TableService::getModelColumns($this->query->from);
    }

    #endregion

    #region CONSTANTS

    /**
     * @var string
     */
    private const COLUMN_FILTERS = 'columnFilters';
    /**
     * @var string
     */
    private const FIRST_FILTER = 'firstFilter';
    /**
     * @var string
     */
    private const FIRST_OPERATOR = 'firstOperator';
    /**
     * @var string
     */
    private const GLOBAL_FILTER = 'globalFilter';
    /**
     * @var string
     */
    private const OPERATOR = 'operator';
    /**
     * @var string
     */
    private const SECOND_FILTER = 'secondFilter';
    /**
     * @var string
     */
    private const SECOND_OPERATOR = 'secondOperator';

    #endregion

    #region PROPERTIES

    /**
     * @var Request
     */
    private readonly Request $request;
    /**
     * @var Builder
     */
    private readonly Builder $query;

    /**
     * @var Collection<ModelColumn>
     */
    private readonly Collection $modelColumns;

    #endregion

    #region PUBLIC METHODS

    /**
     * @return Builder
     */
    public function apply(): Builder
    {
        $this->query->where(function (Builder $subquery)
        {
            $this->applyGlobalFilter($subquery);
        });

        $this->query->where(function (Builder $subquery)
        {
            $this->applyColumnFilters($subquery);
        });

        return $this->query;
    }

    #endregion

    #region PRIVATE METHODS

    /**
     * @param mixed $value
     * @param array $tableColumn
     * @param string $field
     *
     * @return void
     */
    private function applyColumnFilters(Builder $query): void
    {
        $columnFilters = $this->request->get(self::COLUMN_FILTERS);

        if (!$columnFilters)
        {
            return;
        }

        foreach ($this->modelColumns as $modelColumn)
        {
            $key = $modelColumn->id;

            if ($columnFilter = Arr::get($columnFilters, $key, null))
            {
                $firstFilter = Arr::get($columnFilter, self::FIRST_FILTER);
                $firstOperator = Arr::get($columnFilter, self::FIRST_OPERATOR);
                $operator = Arr::get($columnFilter, self::OPERATOR);
                $secondFilter = Arr::get($columnFilter, self::SECOND_FILTER);
                $secondOperator = Arr::get($columnFilter, self::SECOND_OPERATOR);

                if ($firstFilter && $firstOperator)
                {
                    $this->scopeWhere($query, $modelColumn, $key, $firstOperator, $firstFilter);

                    if ($secondFilter && $secondOperator)
                    {
                        if ($operator === '&&')
                        {
                            $this->scopeWhere($query, $modelColumn, $key, $secondOperator, $secondFilter);
                        }
                        else
                        {
                            $this->scopeOrWhere($query, $modelColumn, $key, $secondOperator, $secondFilter);
                        }
                    }
                }
                else if ($secondFilter && $secondOperator)
                {
                    $this->scopeWhere($query, $modelColumn, $key, $secondOperator, $secondFilter);
                }
            }
        }
    }

    /**
     * @param Builder $query
     *
     * @return void
     */
    private function applyGlobalFilter(Builder $query): void
    {
        $globalFilter = $this->request->get(self::GLOBAL_FILTER);

        if (!$globalFilter)
        {
            return;
        }

        foreach ($this->modelColumns as $modelColumn)
        {
            $key = $modelColumn->id;

            switch ($modelColumn->meta->type)
            {
                case Types::ARRAY:
                case Types::OBJECT:
                    if ($modelColumn->foreignTable)
                    {
                        $query->orWhereRelation($modelColumn->relation, $key, SQL::LIKE, '%' . $globalFilter . '%');
                    }
                    $query->orWhere($key, SQL::LIKE, '%' . $globalFilter . '%');
                    break;
                case Types::COLOR:
                case Types::ICON:
                case Types::STRING:
                case Types::TEXT:
                    if ($modelColumn->foreignTable)
                    {
                        $query->orWhereRelation($modelColumn->relation, $key, SQL::LIKE, '%' . $globalFilter . '%');
                    }
                    $query->orWhere($key, SQL::LIKE, '%' . $globalFilter . '%');
                    break;
                case Types::DATE:
                case Types::DATETIME_LOCAL:
                    $query->orWhereDate($key, SQL::LIKE, $globalFilter);
                    break;
                case Types::FLOAT:
                case Types::INTEGER:
                    $query->orWhere($key, SQL::LIKE, '%' . $globalFilter . '%');
                    break;
                default:
                    $query;
                    break;
            }
        }
    }

    /**
     * @param Builder $query
     * @param ModelColumn $modelColumn
     * @param string $key
     * @param string $operator
     * @param mixed $value
     *
     * @return void
     */
    private function scopeWhere(Builder $query, ModelColumn $modelColumn, string $key, string $operator, mixed $value): void
    {
        switch ($modelColumn->meta->type)
        {
            case Types::ARRAY:
            case Types::OBJECT:
                if ($modelColumn->foreignTable)
                {
                    $query->whereRelation($modelColumn->relation, $key, $operator, '%' . $value . '%');
                    break;
                }
                $query->where($key, $operator, '%' . $value . '%');
                break;
            case Types::BOOLEAN:
                $query->where($key, $operator, $value);
                break;
            case Types::COLOR:
            case Types::ICON:
            case Types::STRING:
            case Types::TEXT:
                if ($modelColumn->foreignTable)
                {
                    switch ($operator)
                    {
                        case 'start':
                            $query->whereRelation($modelColumn->relation, $key, SQL::LIKE, $value . '%');
                            break;
                        case 'start binary':
                            $query->whereRelation($modelColumn->relation, $key, SQL::LIKE_BINARY, $value . '%');
                            break;
                        case 'end':
                            $query->whereRelation($modelColumn->relation, $key, SQL::LIKE, '%' . $value);
                            break;
                        case 'end binary':
                            $query->whereRelation($modelColumn->relation, $key, SQL::LIKE_BINARY, '%' . $value);
                            break;
                        default:
                            $query->whereRelation($modelColumn->relation, $key, $operator, '%' . $value . '%');
                            break;
                    }
                }

                else
                {
                    switch ($operator)
                    {
                        case 'start':
                            $query->where($key, SQL::LIKE, $value . '%');
                            break;
                        case 'start binary':
                            $query->where($key, SQL::LIKE_BINARY, $value . '%');
                            break;
                        case 'end':
                            $query->where($key, SQL::LIKE, '%' . $value);
                            break;
                        case 'end binary':
                            $query->where($key, SQL::LIKE_BINARY, '%' . $value);
                            break;
                        default:
                            $query->where($key, $operator, '%' . $value . '%');
                            break;
                    }
                }
                break;
            case Types::DATE:
            case Types::DATETIME_LOCAL:
                $query->whereDate($key, $operator, $value);
                break;
            case Types::FLOAT:
            case Types::INTEGER:
                $query->where($key, $operator, $value);
                break;
            default:
                break;
        }
    }

    /**
     * @param Builder $query
     * @param ModelColumn $modelColumn
     * @param string $key
     * @param string $operator
     * @param mixed $value
     *
     * @return void
     */
    private function scopeOrWhere(Builder $query, ModelColumn $modelColumn, string $key, string $operator, mixed $value): void
    {
        switch ($modelColumn->meta->type)
        {
            case Types::ARRAY:
            case Types::OBJECT:
                if ($modelColumn->foreignTable)
                {
                    $query->orWhereRelation($modelColumn->relation, $key, $operator, '%' . $value . '%');
                    break;
                }
                $query->orWhere($key, $operator, '%' . $value . '%');
                break;
            case Types::COLOR:
            case Types::ICON:
            case Types::STRING:
            case Types::TEXT:
                if ($modelColumn->foreignTable)
                {
                    switch ($operator)
                    {
                        case 'start':
                            $query->orWhereRelation($modelColumn->relation, $key, SQL::LIKE, $value . '%');
                            break;
                        case 'start binary':
                            $query->orWhereRelation($modelColumn->relation, $key, SQL::LIKE_BINARY, $value . '%');
                            break;
                        case 'end':
                            $query->orWhereRelation($modelColumn->relation, $key, SQL::LIKE, '%' . $value);
                            break;
                        case 'end binary':
                            $query->orWhereRelation($modelColumn->relation, $key, SQL::LIKE_BINARY, '%' . $value);
                            break;
                        default:
                            $query->orWhereRelation($modelColumn->relation, $key, $operator, '%' . $value . '%');
                            break;
                    }
                }

                else
                {
                    switch ($operator)
                    {
                        case 'start':
                            $query->orWhere($key, SQL::LIKE, $value . '%');
                            break;
                        case 'start binary':
                            $query->orWhere($key, SQL::LIKE_BINARY, $value . '%');
                            break;
                        case 'end':
                            $query->orWhere($key, SQL::LIKE, '%' . $value);
                            break;
                        case 'end binary':
                            $query->orWhere($key, SQL::LIKE_BINARY, '%' . $value);
                            break;
                        default:
                            $query->orWhere($key, $operator, '%' . $value . '%');
                            break;
                    }
                }
                break;
            case Types::DATE:
            case Types::DATETIME_LOCAL:
                $query->orWhereDate($key, $operator, $value);
                break;
            case Types::FLOAT:
            case Types::INTEGER:
                $query->orWhere($key, $operator, $value);
                break;
            default:
                break;
        }
    }

    #endregion
}
