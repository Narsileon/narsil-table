<?php

namespace Narsil\Table\Structures;

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class ModelColumnMeta
{
    #region CONSTRUCTOR

    /**
     * @param TableColumn $tableColumn
     *
     * @return void
     */
    public function __construct(TableColumn $tableColumn)
    {
        $this->type = $tableColumn->type;
    }

    #endregion

    #region PROPERTIES

    /**
     * @var string
     */
    public readonly string $type;

    #endregion
}
