<?php

namespace Narsil\Tables\Http\Resources;

#region USE

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Collection;
use JsonSerializable;
use Narsil\Tables\Models\ModelComment;
use Narsil\Tables\Services\TableService;

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
            return $item->toArray();
        });
    }

    /**
     * @param Request $request
     *
     * @return array
     */
    public function with($request): array
    {
        $columns = $this->getColumns()->map->get()->values();

        return compact(
            'columns',
        );
    }

    #endregion

    #region PRIVATE METHODS

    /**
     * @return Collection<ModelColumn>
     */
    protected function getColumns(): Collection
    {
        return TableService::getModelColumns(ModelComment::TABLE);
    }

    #endregion
}
