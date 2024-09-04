<?php

namespace Narsil\Tables\Structures;

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class ModelColumn
{
    /**
     * @param string $id
     * @param string $accessorKey
     * @param string $header
     * @param ModelColumnMeta $meta
     * @param string|null $foreignTable
     * @param string|null $relation
     *
     * @return void
     */
    public function __construct(
        string $id,
        string $accessorKey,
        string $header,
        ModelColumnMeta $meta,
        string|null $foreignTable = null,
        string|null $relation = null,

    )
    {
        $this->id = $id;
        $this->accessorKey = $accessorKey;
        $this->header = $header;
        $this->meta = $meta;
        $this->foreignTable = $foreignTable;
        $this->relation = $relation;
    }

    #endregion

    #region CONSTANTS

    /**
     * @var string
     */
    final public const ACCESSOR_KEY = 'accessorKey';
    /**
     * @var string
     */
    final public const FOREIGN_TABLE = 'foreignTable';
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
    final public const RELATION = 'relation';

    #endregion

    #region PROPERTIES

    /**
     * @var string
     */
    public readonly string $accessorKey;
    /**
     * @var string|null
     */
    public readonly string|null $foreignTable;
    /**
     * @var string
     */
    public readonly string $header;
    /**
     * @var string
     */
    public readonly string $id;
    /**
     * @var string
     */
    public readonly string|null $relation;

    /**
     * @var ModelColumMeta
     */
    public readonly ModelColumnMeta $meta;

    #endregion
}
