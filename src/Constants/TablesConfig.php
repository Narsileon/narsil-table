<?php

namespace Narsil\Tables\Constants;

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
abstract class TablesConfig
{
    #region CONSTANTS

    /**
     * @var string List of DataTableCollections keyed by model.
     */
    final public const COLLECTIONS = 'narsil-tables.collections';
    /**
     * @var string List of ShowTableResources keyed by model.
     */
    final public const RESOURCES = 'narsil-tables.resources';
    /**
     * @var string List of models keyed by table.
     */
    final public const TABLE_TO_MODEL = 'narsil-tables.table_to_model';

    #endregion
}
