<?php

namespace Narsil\Table\Services;

#region USE

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use Narsil\Localization\Services\LocalizationService;
use Narsil\Table\Structures\ModelColumn;
use Narsil\Table\Structures\ModelColumnMeta;
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
     * @return Collection<ModelColumn>
     */
    public static function getModelColumns(string $table): Collection
    {
        $tableColumns = static::getTableColumns($table);

        return $tableColumns->map(function (TableColumn $tableColumn)
        {
            return static::convertTableColumnToModelColumn($tableColumn);
        });
    }

    /**
     * @param string $table
     *
     * @return Collection<TableColumn>
     */
    public static function getTableColumns(string $table): Collection
    {
        return Cache::rememberForever("schema:$table", function () use ($table)
        {
            $tableColumns = collect([]);

            $columns = Schema::getColumns($table);
            $foreignKeys = Schema::getForeignKeys($table);
            $indexes = Schema::getIndexes($table);

            foreach ($columns as $column)
            {
                $tableColumn = new TableColumn($column, $foreignKeys, $indexes);

                $tableColumns->put($tableColumn->name, $tableColumn);
            }

            return $tableColumns;
        });
    }

    #endregion

    #region PRIVATE METHODS

    /**
     * @param TableColumn $tableColumn
     *
     * @return string
     */
    private static function getAccessorKey(TableColumn $tableColumn): string
    {
        return str_replace('_id', '.id', $tableColumn->name);
    }

    /**
     * @param TableColumn $tableColumn
     *
     * @return string
     */
    private static function getHeader(TableColumn $tableColumn): string
    {
        $attribute = str_replace('_id', '', $tableColumn->name);

        return LocalizationService::trans("validation.attributes.$attribute");
    }

    /**
     * @param TableColumn $tableColumn
     *
     * @return string
     */
    private static function getRelation(TableColumn $tableColumn): string
    {
        return str_replace('_id', '', $tableColumn->name);
    }

    /**
     * @param TableColumn $tableColumn
     *
     * @return ModelColumn
     */
    private static function convertTableColumnToModelColumn(TableColumn $tableColumn): ModelColumn
    {
        $id = $tableColumn->name;

        $accessorKey = static::getAccessorKey($tableColumn);
        $header = static::getHeader($tableColumn);

        $meta = new ModelColumnMeta($tableColumn->type);

        $foreignTable = $tableColumn->foreignTable;
        $relation = $foreignTable ? static::getRelation($tableColumn) : null;

        return new ModelColumn(
            accessorKey: $accessorKey,
            foreignTable: $foreignTable,
            header: $header,
            id: $id,
            meta: $meta,
            relation: $relation,
        );
    }

    #endregion
}
