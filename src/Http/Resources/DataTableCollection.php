<?php

namespace Narsil\Table\Http\Resources;

#region USE

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use JsonSerializable;
use Narsil\Table\Models\TableTemplate;
use Narsil\Table\Services\TableService;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class DataTableCollection extends ResourceCollection
{
    #region CONSTUCTORS

    /**
     * @param mixed $resource
     * @param string $table
     *
     * @return void
     */
    public function __construct(mixed $resource, string $table)
    {
        $this->table = $table;

        if ($resource->count() > 0)
        {
            $sortings = $this->getSortings();

            $resource = $resource->sortBy($sortings);
        }

        parent::__construct($this->paginate($resource));
    }

    #endregion

    #region CONSTANTS

    /**
     * @var string
     */
    final public const PAGE = 'page';
    /**
     * @var string
     */
    final public const PAGE_SIZE = 'pageSize';

    #endregion

    #region PROPERTIES

    protected readonly string $table;

    #endregion

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
        $columns = array_values($this->getColumns()->toArray());
        $meta = $this->getMeta();

        return compact(
            'columns',
            'meta',
        );
    }

    #endregion

    #region PROTECTED METHODS

    /**
     * @return Collection
     */
    protected function getColumns(): Collection
    {
        return TableService::getModelColumns($this->table);
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
     * @return int
     */
    private function getPageIndex(): int
    {
        return request(self::PAGE, 1);
    }

    /**
     * @return int
     */
    private function getPageSize(): int
    {
        return request(self::PAGE_SIZE, 10);
    }

    /**
     * @return array
     */
    private function getSortings(): array
    {
        $sorting = request(TableTemplate::SORTING, []);

        $sortings = [];

        foreach ($sorting as $key => $value)
        {
            $sortings[] = [
                $key,
                $value,
            ];
        }

        return $sortings;
    }

    private function paginate($items): LengthAwarePaginator
    {
        $pageIndex = $this->getPageIndex();
        $pageSize = $this->getPageSize();

        $paginator = new LengthAwarePaginator($items->forPage($pageIndex, $pageSize), $items->count(), $pageSize, $pageIndex, [
            'path' => LengthAwarePaginator::resolveCurrentPath(),
        ]);

        return $paginator;
    }

    #endregion
}
