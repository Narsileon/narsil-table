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
    final public const HEADER = 'header';
    /**
     * @var string
     */
    final public const ID = 'id';
    /**
     * @var string
     */
    final public const META = 'meta';

    #endregion

    #region PROPERTIES

    /**
     * @var array<string,mixed>
     */
    protected array $column = [];

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
     * Gets the model column meta object.
     *
     * @return ModelColumnMeta
     */
    final public function getMeta(): ModelColumnMeta
    {
        return Arr::get($this->column, self::META);
    }

    /**
     * @param string $accessorKey
     *
     * @return static Returns the current object instance.
     */
    final public function setAccessorKey(string $accessorKey): static
    {
        $this->column[self::ACCESSOR_KEY] = $accessorKey;

        return $this;
    }

    /**
     * @param string $header
     *
     * @return static Returns the current object instance.
     */
    final public function setHeader(string $header): static
    {
        $this->column[self::HEADER] = $header;

        return $this;
    }

    /**
     * @param string $id
     *
     * @return static Returns the current object instance.
     */
    final public function setId(string $id): static
    {
        $this->column[self::ID] = $id;

        return $this;
    }

    /**
     * @param string $meta
     *
     * @return static Returns the current object instance.
     */
    final public function setMeta(ModelColumnMeta $meta): static
    {
        $this->column[self::META] = $meta;

        return $this;
    }

    #endregion
}
