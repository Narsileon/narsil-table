<?php

namespace Narsil\Tables\Http\Controllers;

#region USE

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Narsil\Policies\Policies\AbstractPolicy;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class ResourceDestroyController extends Controller
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

        $this->authorize(AbstractPolicy::DELETE, $model);

        $resource = $model::find($id);

        $resource?->delete();

        if ($request->_back)
        {
            return back()
                ->with('success', 'messages.item_deleted');
        }

        return redirect(route('backend.resources.index', $slug))
            ->with('success', 'messages.item_deleted');
    }

    #endregion
}
