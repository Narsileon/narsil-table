<?php

namespace Narsil\Tables\Http\Controllers;

#region USE

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Narsil\Forms\Http\Requests\DynamicFormRequest;
use Narsil\Localization\Support\NarsilValidator;
use Narsil\Policies\Policies\AbstractPolicy;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class ResourceStoreController extends Controller
{
    #region PUBLIC METHODS

    /**
     * @param Request $request
     * @param string $slug
     *
     * @return RedirectResponse
     */
    public function __invoke(Request $request, string $slug): RedirectResponse
    {
        $table = $this->getTableFromSlug($slug);
        $model = $this->getModelFromTable($table);

        $this->authorize(AbstractPolicy::CREATE, $model);

        $formRequest = new DynamicFormRequest($table, true);

        $data = $request->all();
        $rules = $formRequest->rules();

        $validator = NarsilValidator::make($data, $rules);

        $attributes = $validator->validated();

        $resource = $model::create($attributes);

        if ($request->_back)
        {
            return back()
                ->with('success', 'messages.item_created')
                ->with('response', $resource);
        }

        return redirect($request->_route ?? route('backend.resources.index', $slug))
            ->with('success', 'messages.item_created');
    }

    #endregion
}
