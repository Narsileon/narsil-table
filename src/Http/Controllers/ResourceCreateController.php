<?php

namespace Narsil\Tables\Http\Controllers;

#region USE

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Narsil\Framework\Http\Resources\FormResource;
use Narsil\Framework\Services\ModelService;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class ResourceCreateController extends Controller
{
    #region PUBLIC METHODS

    /**
     * @param Request $request
     * @param string $slug
     *
     * @return RedirectResponse
     */
    public function __invoke(Request $request, string $slug): Response
    {
        $table = $this->getTableFromSlug($slug);
        $model = $this->getModelFromTable($table);

        $this->authorize('create', $model);

        // $resource = (new FormResource(
        //     model: $model,
        //     resource: null,
        //     table: $table,
        // ));

        return Inertia::render('narsil/tables::Resources/Create/Index', compact(
            'resource',
        ));
    }

    #endregion
}
