<?php

namespace Narsil\Table\Http\Resources;

#region USE

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use JsonSerializable;
use Narsil\Table\Constants\Tables;
use Narsil\Table\Services\TableService;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class TableCollection extends ResourceCollection
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
        $columns = $this->getColumns();
        $meta = $this->getMeta();

        return compact(
            'columns',
            'meta',
        );
    }

    #endregion

    #region PROTECTED METHODS

    /**
     * @return array
     */
    protected function getColumns(): array
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
        return request(Tables::PAGE, 1);
    }

    /**
     * @return int
     */
    private function getPageSize(): int
    {
        return request(Tables::PAGE_SIZE, 10);
    }

    /**
     * @return array
     */
    private function getSortings(): array
    {
        $sorting = request(Tables::SORTING, []);

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
