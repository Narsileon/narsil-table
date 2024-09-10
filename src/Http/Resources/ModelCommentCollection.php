<?php

namespace Narsil\Tables\Http\Resources;

#region USE

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use JsonSerializable;
use Narsil\Auth\Models\User;
use Narsil\Tables\Models\ModelComment;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class ModelCommentCollection extends ResourceCollection
{
    #region PUBLIC METHODS

    /**
     * @param Request $request
     *
     * @return JsonSerializable
     */
    public function toArray(Request $request): JsonSerializable
    {
        return $this->collection->map(function ($item)
        {
            $attributes = $item->toArray();

            $attributes[ModelComment::RELATIONSHIP_AUTHOR] = [
                User::AVATAR => $item->{ModelComment::RELATIONSHIP_AUTHOR}->{User::AVATAR},
                User::FULL_NAME => $item->{ModelComment::RELATIONSHIP_AUTHOR}->{User::FULL_NAME},
            ];

            $attributes[ModelComment::AUTHOR_ID] = null;

            return array_filter($attributes);

            return $item->toArray();
        });
    }

    #endregion
}
