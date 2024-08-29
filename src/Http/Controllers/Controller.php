<?php

namespace Narsil\Tables\Http\Controllers;

#region USE

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Narsil\Tables\Constants\TablesConfig;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
abstract class Controller
{
    use AuthorizesRequests;
    use ValidatesRequests;

    #region PROTECTED METHODS

    /**
     * @param string $slug
     *
     * @return string
     */
    protected function getModelFromTable(string $table): string
    {
        $model = Config::get(TablesConfig::TABLE_TO_MODEL, [])[$table];

        if (!$model)
        {
            Log::info("The model '$model' hasn't been found. Did you register it in the configuration?");

            abort(404);
        }

        return $model;
    }

    /**
     * @param string $slug
     *
     * @return string
     */
    protected function getTableFromSlug(string $slug): string
    {
        if (str_contains($slug, '_'))
        {
            abort(404);
        }

        $table = str_replace('-', '_', $slug);

        return $table;
    }

    #endregion
}
