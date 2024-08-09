<?php

namespace Narsil\Table\Structures;

#region USE

use Narsil\Localization\Services\LocalizationService;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class ModelColumn
{
    #region CONSTRUCTOR

    /**
     * @param TableColumn $tableColumn
     *
     * @return void
     */
    public function __construct(TableColumn $tableColumn)
    {
        $this->id = $tableColumn->name;
        $this->foreignTable = $tableColumn->foreignTable;

        $this->accessorKey = $this->getAccessorKey($tableColumn);
        $this->header = $this->getHeader($tableColumn);

        if ($this->foreignTable)
        {
            $this->relation = $this->getRelation($tableColumn);
        }

        $this->meta = new ModelColumnMeta($tableColumn);
    }

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
    public readonly string $relation;

    /**
     * @var ModelColumMeta
     */
    public readonly ModelColumnMeta $meta;

    #endregion

    #region PRIVATE METHODS

    /**
     * @param TableColumn $tableColumn
     *
     * @return string
     */
    private function getAccessorKey(TableColumn $tableColumn): string
    {
        return str_replace('_id', '.id', $tableColumn->name);
    }

    /**
     * @param TableColumn $tableColumn
     *
     * @return string
     */
    private function getHeader(TableColumn $tableColumn): string
    {
        $attribute = str_replace('_id', '', $tableColumn->name);

        return LocalizationService::trans("validation.attributes.$attribute");
    }

    /**
     * @param TableColumn $tableColumn
     *
     * @return string
     */
    private function getRelation(TableColumn $tableColumn): string
    {
        return str_replace('_id', '', $tableColumn->name);
    }

    #endregion
}
