<?php

namespace Narsil\Tables\Http\Controllers;

#region USE

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Narsil\Forms\Http\Requests\DynamicFormRequest;
use Narsil\Localization\Support\NarsilValidator;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class ResourceUpdateController extends Controller
{
    #region PUBLIC METHODS

    /**
     * @param Request $request
     * @param string $slug
     * @param integer $id
     *
     * @return RedirectResponse
     */
    public function __invoke(Request $request, string $slug, int $id): RedirectResponse
    {
        $table = $this->getTableFromSlug($slug);
        $model = $this->getModelFromTable($table);

        $this->authorize('update', $model);

        $resource = $model::find($id);

        if (!$resource)
        {
            abort(403);
        };

        $formRequest = new DynamicFormRequest($table, true);

        $data = $request->all();
        $rules = $formRequest->rules();

        $validator = NarsilValidator::make($data, $rules);

        $attributes = $validator->validated();

        $resource->update($attributes);

        if ($request->_back)
        {
            return back()
                ->with('success', 'messages.item_updated')
                ->with('response', $resource);
        }

        return redirect($request->_route ?? route('backend.resources.index', $slug))
            ->with('success', 'messages.item_updated');
    }

    #endregion
}
