<?php

namespace Narsil\Tables;

#region USE

use Illuminate\Support\ServiceProvider;

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
        $this->bootRoutes();
        $this->bootTranslations();
    }

    #endregion

    #region PRIVATE METHODS

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
        $this->loadJsonTranslationsFrom(__DIR__ . '/../lang', 'table');
    }

    #endregion
}
