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
        $pageIndex = 1;

        if ($index = request()->get(Tables::PAGE))
        {

            $pageIndex = $index;
        }

        return $pageIndex;
    }

    /**
     * @return int
     */
    private function getPageSize(): int
    {
        $pageSize = 10;

        if ($size = request()->get(Tables::PAGINATION . '.' . Tables::PAGE_SIZE))
        {
            $pageSize = $size;
        }

        return $pageSize;
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
