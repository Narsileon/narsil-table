<?php

namespace Narsil\Tables;

#region USE

use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;
use Narsil\Tables\Constants\TablesConfig;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class NarsilTablesServiceProvider extends ServiceProvider
{
    #region PUBLIC METHODS

    /**
     * @return void
     */
    public function boot(): void
    {
        $this->bootMigrations();
        $this->bootPublishes();
        $this->bootTranslations();

        if (Config::get(TablesConfig::PROVIDER_ROUTES, true))
        {
            $this->bootRoutes();
        }
    }

    #endregion

    #region PRIVATE METHODS

    /**
     * @return void
     */
    private function bootMigrations(): void
    {
        $this->loadMigrationsFrom([
            __DIR__ . '/../database/migrations',
        ]);
    }

    /**
     * @return void
     */
    private function bootPublishes(): void
    {
        $this->publishes([
            __DIR__ . '/Config' => config_path(),
        ], 'config');
    }

    /**
     * @return void
     */
    private function bootRoutes(): void
    {
        $this->loadRoutesFrom(__DIR__ . '/../routes/backend.php');
    }

    /**
     * @return void
     */
    private function bootTranslations(): void
    {
        $this->loadJsonTranslationsFrom(__DIR__ . '/../lang', 'tables');
        $this->loadTranslationsFrom(__DIR__ . '/../lang', 'tables');
    }

    #endregion
}
