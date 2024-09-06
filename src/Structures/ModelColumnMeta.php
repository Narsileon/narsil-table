<?php

namespace Narsil\Tables\Structures;

#region USE

use Illuminate\Support\Arr;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class ModelColumnMeta
{
    #region CONSTANTS

    /**
     * @var string
     */
    final public const FOREIGN_TABLE = 'foreign_table';
    /**
     * @var string
     */
    final public const RELATION = 'relation';
    /**
     * @var string
     */
    final public const TYPE = 'type';

    #endregion

    #region PROPERTIES

    /**
     * @var array<string,mixed>
     */
    protected array $meta = [];

    #endregion

    #region PUBLIC METHODS

    /**
     * Gets the model column meta.
     *
     * @param string|null $key
     *
     * @return mixed
     */
    public function get(string|null $key = null): mixed
    {
        return Arr::get($this->meta, $key);
    }

    /**
     * @param string|null $foreignTable
     *
     * @return static Returns the current object instance.
     */
    final public function setForeignTable(string|null $foreignTable = null): static
    {
        $this->meta[self::FOREIGN_TABLE] = $foreignTable;

        return $this;
    }

    /**
     * @param string|null $relation
     *
     * @return static Returns the current object instance.
     */
    final public function setRelation(string|null $relation = null): static
    {
        $this->meta[self::RELATION] = $relation;

        return $this;
    }

    /**
     * @param string $type
     *
     * @return static Returns the current object instance.
     */
    final public function setType(string $type): static
    {
        $this->meta[self::TYPE] = $type;

        return $this;
    }

    #endregion
}
