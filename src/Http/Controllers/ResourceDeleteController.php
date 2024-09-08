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
     *
     * @return RedirectResponse
     */
    public function __invoke(Request $request, string $slug): RedirectResponse
    {
        $table = $this->getTableFromSlug($slug);
        $model = $this->getModelFromTable($table);

        $this->authorize('delete', $model);

        $deleted = $request->input('deleted', []);

        $model::whereIn('id', $deleted)->delete();

        return back()
            ->with('success', 'messages.items_deleted');
    }

    #endregion
}
