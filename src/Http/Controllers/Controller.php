<?php

namespace Narsil\Tables\Http\Controllers;

#region USE

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Narsil\Policies\Policies\AbstractPolicy;
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

    /**
     * @param string $ability
     * @param string $model
     *
     * @return boolean
     */
    protected function isAuthorizable(string $ability, string $model): void
    {
        $policy = Gate::getPolicyFor($model);

        if ($policy && is_subclass_of($policy, AbstractPolicy::class))
        {
            if (!$policy->hasAbility($ability))
            {
                abort(404);
            }
        }
    }

    #endregion
}
