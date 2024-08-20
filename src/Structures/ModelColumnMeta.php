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
     * @param string $type
     *
     * @return void
     */
    public function __construct(string $type)
    {
        $this->type = $type;
    }

    #endregion

    #region PROPERTIES

    /**
     * @var string
     */
    public readonly string $type;

    #endregion
}
