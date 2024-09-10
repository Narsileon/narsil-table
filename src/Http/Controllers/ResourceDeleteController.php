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

        $this->authorize(AbstractPolicy::DELETE, $model);

        $deleted = $request->input('deleted', []);

        $model::whereIn('id', $deleted)->delete();

        return redirect(route('backend.resources.index', $slug))
            ->with('success', 'messages.items_deleted');
    }

    #endregion
}
