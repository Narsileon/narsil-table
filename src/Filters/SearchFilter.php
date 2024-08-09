<?php

namespace Narsil\Table\Filters;

#region USE

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Narsil\Table\Constants\SQL;
use Narsil\Table\Constants\Types;
use Narsil\Table\Services\TableService;
use Narsil\Table\Structures\ModelColumn;

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
    private function applyGlobalFilter(Builder $query): void
    {
        $globalFilter = $this->request->get('globalFilter');

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
                        $query->orWhereRelation($modelColumn->relation, $key, 'like', '%' . $globalFilter . '%');
                    }
                    $query->orWhere($key, 'like', '%' . $globalFilter . '%');
                case Types::COLOR:
                case Types::ICON:
                case Types::STRING:
                case Types::TEXT:
                    if ($modelColumn->foreignTable)
                    {
                        $query->orWhereRelation($modelColumn->relation, $key, 'like', '%' . $globalFilter . '%');
                    }
                    $query->orWhere($key, SQL::LIKE, '%' . $globalFilter . '%');
                case Types::DATE:
                case Types::DATETIME_LOCAL:
                    $query->orWhereDate($key, SQL::LIKE, $globalFilter);
                case Types::FLOAT:
                case Types::INTEGER:
                    $query->orWhere($key, SQL::LIKE, '%' . $globalFilter . '%');
                default:
                    $query;
            }
        }
    }

    /**
     * @param ModelColumn $modelColumn
     * @param string $key
     * @param string $operator
     * @param mixed $value
     *
     * @return Builder
     */
    private function scopeWhere(ModelColumn $modelColumn, string $key, string $operator, mixed $value): Builder
    {
        switch ($modelColumn->meta->type)
        {
            case Types::ARRAY:
            case Types::OBJECT:
                if ($modelColumn->foreignTable)
                {
                    return $this->query->whereRelation($modelColumn->relation, $key, $operator, '%' . $value . '%');
                }
                return $this->query->where($key, $operator, '%' . $value . '%');
            case Types::BOOLEAN:
                return $this->query->where($key, $operator, $value);
            case Types::COLOR:
            case Types::ICON:
            case Types::STRING:
            case Types::TEXT:
                if ($modelColumn->foreignTable)
                {
                    switch ($operator)
                    {
                        case 'start':
                            return $this->query->whereRelation($modelColumn->relation, $key, SQL::LIKE, $value . '%');
                        case 'start binary':
                            return $this->query->whereRelation($modelColumn->relation, $key, SQL::LIKE_BINARY, $value . '%');
                        case 'end':
                            return $this->query->whereRelation($modelColumn->relation, $key, SQL::LIKE, '%' . $value);
                        case 'end binary':
                            return $this->query->whereRelation($modelColumn->relation, $key, SQL::LIKE_BINARY, '%' . $value);
                        default:
                            return $this->query->whereRelation($modelColumn->relation, $key, $operator, '%' . $value . '%');
                    }
                }

                else
                {
                    switch ($operator)
                    {
                        case 'start':
                            return $this->query->where($key, SQL::LIKE, $value . '%');
                        case 'start binary':
                            return $this->query->where($key, SQL::LIKE_BINARY, $value . '%');
                        case 'end':
                            return $this->query->where($key, SQL::LIKE, '%' . $value);
                        case 'end binary':
                            return $this->query->where($key, SQL::LIKE_BINARY, '%' . $value);
                        default:
                            return $this->query->where($key, $operator, '%' . $value . '%');
                    }
                }
            case Types::DATE:
            case Types::DATETIME_LOCAL:
                return $this->query->whereDate($key, $operator, $value);
            case Types::FLOAT:
            case Types::INTEGER:
                return $this->query->where($key, $operator, $value);
            default:
                return $this->query;
        }
    }

    /**
     * @param ModelColumn $modelColumn
     * @param string $key
     * @param string $operator
     * @param mixed $value
     *
     * @return Builder
     */
    private function scopeOrWhere(ModelColumn $modelColumn, string $key, string $operator, mixed $value): Builder
    {
        switch ($modelColumn->meta->type)
        {
            case Types::ARRAY:
            case Types::OBJECT:
                if ($modelColumn->foreignTable)
                {
                    return $this->query->orWhereRelation($modelColumn->relation, $key, $operator, '%' . $value . '%');
                }
                return $this->query->orWhere($key, $operator, '%' . $value . '%');
            case Types::COLOR:
            case Types::ICON:
            case Types::STRING:
            case Types::TEXT:
                if ($modelColumn->foreignTable)
                {
                    switch ($operator)
                    {
                        case 'start':
                            return $this->query->orWhereRelation($modelColumn->relation, $key, SQL::LIKE, $value . '%');
                        case 'start binary':
                            return $this->query->orWhereRelation($modelColumn->relation, $key, SQL::LIKE_BINARY, $value . '%');
                        case 'end':
                            return $this->query->orWhereRelation($modelColumn->relation, $key, SQL::LIKE, '%' . $value);
                        case 'end binary':
                            return $this->query->orWhereRelation($modelColumn->relation, $key, SQL::LIKE_BINARY, '%' . $value);
                        default:
                            return $this->query->orWhereRelation($modelColumn->relation, $key, $operator, '%' . $value . '%');
                    }
                }

                else
                {
                    switch ($operator)
                    {
                        case 'start':
                            return $this->query->orWhere($key, SQL::LIKE, $value . '%');
                        case 'start binary':
                            return $this->query->orWhere($key, SQL::LIKE_BINARY, $value . '%');
                        case 'end':
                            return $this->query->orWhere($key, SQL::LIKE, '%' . $value);
                        case 'end binary':
                            return $this->query->orWhere($key, SQL::LIKE_BINARY, '%' . $value);
                        default:
                            return $this->query->orWhere($key, $operator, '%' . $value . '%');
                    }
                }
            case Types::DATE:
            case Types::DATETIME_LOCAL:
                return $this->query->orWhereDate($key, $operator, $value);
            case Types::FLOAT:
            case Types::INTEGER:
                return $this->query->orWhere($key, $operator, $value);
            default:
                return $this->query;
        }
    }

    #endregion
}
