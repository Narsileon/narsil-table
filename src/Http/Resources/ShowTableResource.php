<?php

namespace Narsil\Tables\Http\Resources;

#region USE

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Narsil\Localization\Services\LocalizationService;
use Narsil\Tables\Services\TableService;

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
        $columns = array_values($this->getColumns()->toArray());
        $meta = $this->getMeta();
        $slug = $this->getSlug();
        $title = $this->getTitle();

        return compact(
            'columns',
            'meta',
            'slug',
            'title',
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

    #region PRIVATE METHODS

    /**
     * @return string
     */
    private function getSlug(): string
    {
        return Str::slug($this->resource->getTable());
    }

    /**
     * @return string
     */
    private function getTitle(): string
    {
        $modelClassName = class_basename($this->resource::class);

        $readableName = ucfirst(Str::lower(Str::snake($modelClassName, ' ')));

        return LocalizationService::trans($readableName);
    }

    #endregion
}
