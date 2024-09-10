<?php

namespace Narsil\Tables\Http\Controllers;

#region USE

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Narsil\Policies\Policies\AbstractPolicy;
use Narsil\Tables\Constants\TablesConfig;
use Narsil\Tables\Filters\SearchFilter;
use Narsil\Tables\Http\Controllers\Controller;
use Narsil\Tables\Http\Resources\DataTableCollection;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class ResourceIndexController extends Controller
{
    #region PUBLIC METHODS

    /**
     * @param Request $request
     * @param string $slug
     *
     * @return Response
     */
    public function __invoke(Request $request, string $slug): Response
    {
        $table = $this->getTableFromSlug($slug);
        $model = $this->getModelFromTable($table);

        $this->isAuthorizable(AbstractPolicy::VIEW, $model);
        $this->authorize(AbstractPolicy::VIEW, $model);

        $query = $model::query();

        $filter = new SearchFilter($request, $query);

        $resource = $filter->apply()->get();

        $collectionClass = $this->getCollectionClass($model);

        $collection = (new $collectionClass($resource, $table));

        $abilities = Gate::getPolicyFor($model)->getAbilities();

        return Inertia::render('narsil/tables::Resources/Index', compact(
            'abilities',
            'collection',
        ));
    }

    #endregion

    #region PRIVATE METHODS

    /**
     * @param string $model
     *
     * @return string
     */
    private function getCollectionClass(string $model): string
    {
        $collectionClasses = Config::get(TablesConfig::COLLECTIONS, []);

        $collectionClass = $collectionClasses[$model] ?? DataTableCollection::class;

        return $collectionClass;
    }

    #endregion
}
