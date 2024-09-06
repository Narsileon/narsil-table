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
class ModelColumn
{
    #region CONSTANTS

    /**
     * @var string
     */
    final public const ACCESSOR_KEY = 'accessorKey';
    /**
     * @var string
     */
    final public const FOREIGN_TABLE = 'meta.foreign_table';
    /**
     * @var string
     */
    final public const HEADER = 'header';
    /**
     * @var string
     */
    final public const ID = 'id';
    /**
     * @var string
     */
    final public const META = 'meta';
    /**
     * @var string
     */
    final public const RELATION = 'meta.relation';
    /**
     * @var string
     */
    final public const TYPE = 'meta.type';

    #endregion

    #region PROPERTIES

    /**
     * @var array<string,mixed>
     */
    protected array $column = [
        self::META => [],
    ];

    #endregion

    #region PUBLIC METHODS

    /**
     * Gets the model column.
     *
     * @param string|null $key
     *
     * @return mixed
     */
    public function get(string|null $key = null): mixed
    {
        return Arr::get($this->column, $key);
    }

    /**
     * @param string $accessorKey
     *
     * @return static Returns the current object instance.
     */
    final public function setAccessorKey(string $accessorKey): static
    {
        Arr::set($this->column, self::ACCESSOR_KEY, $accessorKey);

        return $this;
    }

    /**
     * @param string|null $foreignTable
     *
     * @return static Returns the current object instance.
     */
    final public function setForeignTable(string|null $foreignTable = null): static
    {
        Arr::set($this->column, self::FOREIGN_TABLE, $foreignTable);

        return $this;
    }

    /**
     * @param string $header
     *
     * @return static Returns the current object instance.
     */
    final public function setHeader(string $header): static
    {
        Arr::set($this->column, self::HEADER, $header);

        return $this;
    }

    /**
     * @param string $id
     *
     * @return static Returns the current object instance.
     */
    final public function setId(string $id): static
    {
        Arr::set($this->column, self::ID, $id);

        return $this;
    }

    /**
     * @param string|null $relation
     *
     * @return static Returns the current object instance.
     */
    final public function setRelation(string|null $relation = null): static
    {
        Arr::set($this->column, self::RELATION, $relation);

        return $this;
    }

    /**
     * @param string $type
     *
     * @return static Returns the current object instance.
     */
    final public function setType(string $type): static
    {
        Arr::set($this->column, self::TYPE, $type);

        return $this;
    }

    #endregion
}
