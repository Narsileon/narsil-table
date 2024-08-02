<?php

namespace Narsil\Table\Http\Resources;

#region USE

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use JsonSerializable;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class TableCollection extends ResourceCollection
{
    #region CONSTUCTORS

    public function __construct($resource,)
    {
        parent::__construct($resource->paginate());
    }

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
        $meta = $this->getMeta();

        return compact(
            'meta',
        );
    }

    #endregion

    #region PROTECTED METHODS

    /**
     * @return array
     */
    protected function getMeta(): array
    {
        return [];
    }

    #endregion
}
