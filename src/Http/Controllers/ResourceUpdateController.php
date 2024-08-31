<?php

namespace Narsil\Tables\Http\Controllers;

#region USE

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

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
     * @param string $table
     * @param integer $id
     *
     * @return RedirectResponse
     */
    public function __invoke(Request $request, string $table, int $id): RedirectResponse
    {
        $model = ModelService::getModelFromTable($table);

        $policy = Gate::getPolicyFor($model);

        $resource = $model::find($id);

        if (($policy && !$policy->update(Auth::user(), $model)) || !$resource)
        {
            abort(403);
        };

        $attributes = ResourceService::resolveAttributes($request, $model, true);

        $resource->update($attributes);

        $message = Sessions::newModelMessage('item_updated', $model);

        if ($request->_back)
        {
            return back()
                ->with(Sessions::SUCCESS, $message)
                ->with(Sessions::RESPONSE, $resource);
        }

        return redirect($request->_route ?? RouteService::getResourceUrl($table))
            ->with(Sessions::SUCCESS, $message);
    }

    #endregion
}
