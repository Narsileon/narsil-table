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

        $this->groupings = $this->getGroupings();
        $this->pageIndex = $this->getPageIndex();
        $this->pageSize = $this->getPageSize();
        $this->sortings = $this->getSortings();

        if ($resource->count() > 0)
        {
            if (count($this->sortings) > 0)
            {
                $resource = $resource->sortBy($this->sortings);
            }
        }

        parent::__construct($this->paginate($resource));
    }

    #endregion

    #region CONSTANTS

    /**
     * @var string
     */
    final public const ID = 'id';
    /**
     * @var string
     */
    final public const PAGE = 'page';
    /**
     * @var string
     */
    final public const PAGE_SIZE = 'pageSize';
    /**
     * @var string
     */
    final public const PATH = 'path';

    #endregion

    #region PROPERTIES

    /**
     * @var array
     */
    private readonly array $groupings;
    /**
     * @var integer
     */
    private readonly int $pageIndex;
    /**
     * @var integer
     */
    private readonly int $pageSize;
    /**
     * @var array
     */
    private readonly array $sortings;

    /**
     * @var string
     */
    private readonly string $table;

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
        return [
            'groupingCounts' => $this->getGroupedCounts($this->resource),
        ];
    }

    #endregion

    #region PRIVATE METHODS

    /**
     * @param mixed $resource
     *
     * @return array
     */
    private function getGroupedCounts(mixed $resource): array
    {
        $groupingCounts = [];

        foreach ($this->groupings as $grouping)
        {
            $groupingCounts[$grouping] = $resource->countBy($grouping);
        }

        return $groupingCounts;
    }

    /**
     * @return array
     */
    private function getGroupings(): array
    {
        return request(TableTemplate::GROUPING, []);
    }

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

    /**
     * @param mixed $items
     *
     * @return LengthAwarePaginator
     */
    private function paginate(mixed $items): LengthAwarePaginator
    {
        $paginatedItems = $items->forPage($this->pageIndex, $this->pageSize);

        $paginator = new LengthAwarePaginator(
            $paginatedItems,
            $items->count(),
            $this->pageSize,
            $this->pageIndex,
            [self::PATH => LengthAwarePaginator::resolveCurrentPath()],
        );

        return $paginator;
    }

    #endregion
}
