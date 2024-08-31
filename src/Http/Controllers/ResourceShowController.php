<?php

namespace Narsil\Tables\Http\Controllers;

#region USE

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use Inertia\Response;
use Narsil\Tables\Constants\TablesConfig;
use Narsil\Tables\Http\Resources\ShowTableResource;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class ResourceShowController extends Controller
{
    #region PUBLIC METHODS

    /**
     * @param Request $request
     * @param string $slug
     * @param integer $id
     *
     * @return RedirectResponse|Response
     */
    public function __invoke(Request $request, string $slug, int $id): RedirectResponse|Response
    {
        $table = $this->getTableFromSlug($slug);
        $model = $this->getModelFromTable($table);

        $instance = $model::find($id);

        if (!$instance)
        {
            abort(404);
        };

        $resourceClass = $this->getResourceClass($model);

        $resource = new $resourceClass($instance);

        return Inertia::render('narsil/tables::Resources/Show/Index', compact(
            'resource',
        ));
    }

    #endregion

    #region PRIVATE METHODS

    /**
     * @param string $model
     *
     * @return string
     */
    private function getResourceClass(string $model): string
    {
        $collectionClasses = Config::get(TablesConfig::RESOURCES, []);

        $collectionClass = $collectionClasses[$model] ?? ShowTableResource::class;

        return $collectionClass;
    }

    #endregion
}
