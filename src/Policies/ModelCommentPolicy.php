<?php

namespace Narsil\Tables\Policies;

#region USE

use Narsil\Policies\Policies\AbstractPolicy;
use Narsil\Tables\Models\ModelComment;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class ModelCommentPolicy extends AbstractPolicy
{
    #region CONSTRUCTOR

    /**
     * @return void
     */
    public function __construct()
    {
        parent::__construct(
            ModelComment::class,
            canCreate: false,
        );
    }

    #endregion
}
