<?php

namespace Narsil\Table\Services;

#region USE

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use Narsil\Localization\Services\LocalizationService;
use Narsil\Table\Constants\Tables;
use Narsil\Table\Structures\TableColumn;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class TableService
{
    #region PUBLIC METHODS

    /**
     * @param string $table;
     *
     * @return array
     */
    public static function getModelColumns(string $table): array
    {
        $tableColumns = static::getTableColumns($table);

        $modelColumns = [];

        foreach ($tableColumns as $attribute => $column)
        {
            $rules = [];

            if ($column->foreignTable)
            {
                $relation = str_replace('_id', '', $attribute);

                $rules = [
                    Tables::ACCESSOR_KEY => $relation . '.id',
                    Tables::HEADER => LocalizationService::trans("validation.attributes.$relation"),
                    Tables::RELATIONSHIP => $relation,
                    Tables::RELATIONSHIP_TABLE => $column->foreignTable,
                ];
            }
            else
            {
                $rules = [
                    Tables::ACCESSOR_KEY => $attribute,
                    Tables::HEADER => LocalizationService::trans("validation.attributes.$attribute"),
                ];
            }

            $rules = array_merge($rules, [
                Tables::ID => $attribute,
                Tables::TYPE => $column->type,
            ]);

            $modelColumns[] = $rules;
        }

        return $modelColumns;
    }

    /**
     * @param string $column
     * @param bool $includeAuto
     *
     * @return array<string,TableColumn>
     */
    public static function getTableColumns(string $table, bool $includeAuto = true): array
    {
        $tableColumns = Cache::rememberForever("schema:$table", function () use ($table, $includeAuto)
        {
            $tableColumns = [];

            $columns = Schema::getColumns($table);
            $foreignKeys = Schema::getForeignKeys($table);
            $indexes = Schema::getIndexes($table);

            foreach ($columns as $column)
            {
                $tableColumn = new TableColumn($column, $foreignKeys, $indexes);

                if (!$includeAuto && $tableColumn->auto)
                {
                    continue;
                }

                $tableColumns[$tableColumn->name] = $tableColumn;
            }

            return $tableColumns;
        });

        return $tableColumns;
    }

    #endregion
}
