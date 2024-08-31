<?php

namespace Narsil\Tables\Http\Controllers;

#region USE

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Narsil\Framework\Services\ModelService;

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

        $this->authorize('edit', $model);

        $resource = $model::find($id);

        if (!$resource)
        {
            abort(404);
        };

        $formResource = $model::getFormResource();

        // $resource = (new $formResource(
        //     model: $model,
        //     resource: $resource,
        //     table: $table,
        // ));

        return Inertia::render('narsil/tables::Resources/Edit/Index', compact(
            'resource',
        ));
    }

    #endregion
}
