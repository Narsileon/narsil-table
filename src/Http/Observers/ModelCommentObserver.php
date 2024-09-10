<?php

namespace Narsil\Tables\Observers;

#region USE

use Illuminate\Support\Facades\Auth;
use Narsil\Tables\Models\ModelComment;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class ModelCommentObserver
{
    #region PUBLIC METHODS

    /**
     * @param ModelComment $modelComment
     *
     * @return void
     */
    public function saving(ModelComment $modelComment): void
    {
        $modelComment->{ModelComment::AUTHOR_ID} = Auth::id();
    }

    #endregion
}
