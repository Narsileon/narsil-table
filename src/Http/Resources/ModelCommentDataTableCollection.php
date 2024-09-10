<?php

namespace Narsil\Tables\Http\Resources;

#region USE

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use JsonSerializable;
use Narsil\Auth\Models\User;
use Narsil\Tables\Constants\Types;
use Narsil\Tables\Models\ModelComment;
use Narsil\Tables\Structures\ModelColumn;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class ModelCommentDataTableCollection extends DataTableCollection
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

            $attributes[ModelComment::AUTHOR_ID] = null;
            $attributes[ModelComment::RELATIONSHIP_AUTHOR] = [
                User::FULL_NAME => $item->{ModelComment::RELATIONSHIP_AUTHOR}->{User::FULL_NAME},
            ];

            return array_filter($attributes);
        });
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
