<?php

namespace Narsil\Tables\Http\Resources\ModelComments;

#region USE

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Narsil\Auth\Models\User;
use Narsil\Tables\Constants\Types;
use Narsil\Tables\Http\Resources\ShowTableResource;
use Narsil\Tables\Models\ModelComment;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class ModelCommentShowTableResource extends ShowTableResource
{
    #region PUBLIC METHODS

    /**
     * @param Request $request
     *
     * @return array
     */
    public function toArray(Request $request): array
    {
        $attributes = $this->resource->toArray();

        $attributes[ModelComment::AUTHOR_ID] = null;
        $attributes[ModelComment::RELATIONSHIP_AUTHOR] = [
            User::FULL_NAME => $this->resource->{ModelComment::RELATIONSHIP_AUTHOR}->{User::FULL_NAME},
        ];

        return array_filter($attributes);
    }

    #endregion

    #region PROTECTED METHODS

    /**
     * @return Collection<ModelColumn>
     */
    protected function getColumns(): Collection
    {
        $columns = parent::getColumns();

        $authorId = $columns->get(ModelComment::AUTHOR_ID);

        $authorId->setAccessorKey(ModelComment::RELATIONSHIP_AUTHOR . '.' . User::FULL_NAME);
        $authorId->setType(Types::STRING);

        $columns->put(ModelComment::AUTHOR_ID, $authorId);

        return $columns;
    }

    #endregion
}
