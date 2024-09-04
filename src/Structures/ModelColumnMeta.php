<?php

namespace Narsil\Tables\Structures;

#region USE

use Illuminate\Support\Collection;

#endregion

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
     * @param Collection<ModelColumn> $columns
     *
     * @return void
     */
    public function __construct(string $type, Collection|null $columns = null)
    {
        $this->columns = $columns;
        $this->type = $type;
    }

    #endregion

    #region PROPERTIES

    /**
     * @var Collection<ModelColumn>|null
     */
    public readonly Collection|null $columns;
    /**
     * @var string
     */
    public readonly string $type;

    #endregion
}
