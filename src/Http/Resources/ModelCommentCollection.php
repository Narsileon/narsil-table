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

            $author = $item->{ModelComment::RELATIONSHIP_AUTHOR};

            $attributes[ModelComment::RELATIONSHIP_AUTHOR] = [
                User::AVATAR => $author?->{User::AVATAR},
                User::FIRST_NAME => $author?->{User::FIRST_NAME},
                User::FULL_NAME => $author?->{User::FULL_NAME},
                User::LAST_NAME => $author?->{User::LAST_NAME},
            ];

            return array_filter($attributes);
        });
    }

    #endregion
}
