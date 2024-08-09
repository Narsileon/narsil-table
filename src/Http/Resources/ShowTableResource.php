<?php

namespace Narsil\Table\Http\Resources;

#region USE

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Narsil\Table\Services\TableService;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class ShowTableResource extends JsonResource
{
    #region PUBLIC METHODS

    /**
     * @param Request $request
     *
     * @return array
     */
    public function toArray(Request $request): array
    {
        return $this->resource->toArray();
    }

    /**
     * @param Request $request
     *
     * @return array
     */
    public function with(Request $request): array
    {
        $columns = $this->getColumns();
        $meta = $this->getMeta();

        return compact(
            'columns',
            'meta',
        );
    }

    #region PROTECTED METHODS

    /**
     * @return Collection
     */
    protected function getColumns(): Collection
    {
        return TableService::getModelColumns($this->resource->getTable());
    }

    /**
     * @return array
     */
    protected function getMeta(): array
    {
        return [];
    }

    #endregion
}
