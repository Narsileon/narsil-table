<?php

namespace Narsil\Table\Services;

#region USE

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use Narsil\Table\Structures\ModelColumn;
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
            return new ModelColumn($tableColumn);
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
}
