<?php

namespace Narsil\Tables\Http\Controllers;

#region USE

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use Inertia\Response;
use Narsil\Forms\Constants\FormsConfig;
use Narsil\Forms\Http\Resources\FormResource;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class ResourceEditController extends Controller
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

        $this->authorize('update', $model);

        $instance = $model::find($id);

        if (!$instance)
        {
            abort(404);
        };

        $formClass = $this->getFormClass($model);

        $resource = new $formClass($instance);

        return Inertia::render('narsil/tables::Resources/Edit/Index', compact(
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
    private function getFormClass(string $model): string
    {
        $formClasses = Config::get(FormsConfig::FORMS, []);

        $formClass = $formClasses[$model] ?? FormResource::class;

        return $formClass;
    }

    #endregion
}
