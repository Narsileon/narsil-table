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
use Narsil\Policies\Policies\AbstractPolicy;

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

        $this->isAuthorizable(AbstractPolicy::CREATE, $model);
        $this->authorize(AbstractPolicy::CREATE, $model);

        $formClass = $this->getFormClass($model);

        $resource = new $formClass(new $model());

        return Inertia::render('narsil/tables::Resources/Create/Index', compact(
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
