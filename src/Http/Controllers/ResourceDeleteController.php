<?php

namespace Narsil\Tables\Http\Controllers;

#region USE

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class ResourceDeleteController extends Controller
{
    #region PUBLIC METHODS

    /**
     * @param DestroyRequest $request
     * @param string $slug
     * @param integer $id
     *
     * @return RedirectResponse
     */
    public function __invoke(Request $request, string $slug, int $id): RedirectResponse
    {
        $table = $this->getTableFromSlug($slug);
        $model = $this->getModelFromTable($table);

        $this->authorize('delete', $model);

        $resource = $model::find($id);

        $resource?->delete();

        return back()
            ->with('success', 'item_deleted');
    }

    #endregion
}
