<?php

namespace Narsil\Tables\Services;

#region USE

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use Narsil\Localization\Services\LocalizationService;
use Narsil\Tables\Structures\ModelColumn;
use Narsil\Tables\Structures\ModelColumnMeta;
use Narsil\Tables\Structures\TableColumn;

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
     * @return ModelColumn
     */
    private static function convertTableColumnToModelColumn(TableColumn $tableColumn): ModelColumn
    {
        $modelColumn = (new ModelColumn())
            ->setAccessorKey(static::getAccessorKey($tableColumn))
            ->setForeignTable($tableColumn->foreignTable)
            ->setHeader(static::getHeader($tableColumn))
            ->setId($tableColumn->name)
            ->setRelation($tableColumn->foreignTable ? static::getRelation($tableColumn) : null)
            ->setType($tableColumn->type);

        return $modelColumn;
    }

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

    #endregion
}
