<?php

namespace Narsil\Tables\Http\Controllers;

#region USE

use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

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
     * @param string $table
     *
     * @return RedirectResponse
     */
    public function __invoke(Request $request, string $table): RedirectResponse
    {
        $model = ModelService::getModelFromTable($table);

        $policy = Gate::getPolicyFor($model);

        if ($policy && !$policy->create(Auth::user(), $model))
        {
            abort(403);
        };

        $attributes = ResourceService::resolveAttributes($request, $model);

        DB::beginTransaction();

        try
        {
            $resource = $model::create($attributes);

            if (is_subclass_of($model, NodeTargetModel::class))
            {
                $this->createNode($request, $resource);
            }

            DB::commit();
        }
        catch (Exception $exception)
        {
            DB::rollBack();

            return back()
                ->with(Sessions::ERROR, Sessions::newMessage('error_occured'));
        }

        $message = Sessions::newModelMessage('item_created', $model);

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

    #region PRIVATE METHODS

    /**
     * @param Request $request
     * @param mixed $resource
     *
     * @return void
     */
    private function createNode(Request $request, mixed $resource): void
    {
        $model = get_class($resource);

        $nodeModel = (new $model())->getNodeModel();

        $nodeModel::create([
            NodeModel::MODEL_ID => $resource->{NodeTargetModel::ID},
            NodeModel::MODEL_TYPE => $model,
            NodeModel::PARENT_ID => $request->get('parent_id', null),
        ]);
    }

    #endregion
}
