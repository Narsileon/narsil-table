<?php

namespace Narsil\Auth\Models;

#region USE

use Illuminate\Database\Eloquent\Model;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class TableTemplate extends Model
{
    #region CONSTRUCTOR

    /**
     * @param array $attributes
     *
     * @return void
     */
    public function __construct(array $attributes = [])
    {
        $this->table = self::TABLE;

        parent::__construct($attributes);
    }

    #endregion

    #region CONSTANTS

    /**
     * @var string
     */
    final public const ACTIVE = 'active';
    /**
     * @var string
     */
    final public const COLUMN_FILTERS = 'column_filters';
    /**
     * @var string
     */
    final public const COLUMN_OPERATORS = 'column_operators';
    /**
     * @var string
     */
    final public const COLUMN_ORDER = 'column_order';
    /**
     * @var string
     */
    final public const COLUMN_SETTINGS = 'column_settings';
    /**
     * @var string
     */
    final public const COLUMN_SIZING = 'column_sizing';
    /**
     * @var string
     */
    final public const COLUMN_VISIBILITY = 'column_visibility';
    /**
     * @var string
     */
    final public const EXPANDED = 'expanded';
    /**
     * @var string
     */
    final public const GLOBAL_FILTER = 'global_filter';
    /**
     * @var string
     */
    final public const GROUPING = 'grouping';
    /**
     * @var string
     */
    final public const ID = 'id';
    /**
     * @var string
     */
    final public const NAME = 'name';
    /**
     * @var string
     */
    final public const SORTING = 'sorting';
    /**
     * @var string
     */
    final public const SPECIAL_FILTERS = 'special_filters';
    /**
     * @var string
     */
    final public const TYPE = 'type';

    /**
     * @var string
     */
    final public const TABLE = 'table_templates';

    #endregion
}
