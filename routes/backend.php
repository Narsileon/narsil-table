<?php

#region USE

use Illuminate\Support\Facades\Route;
use Narsil\Tables\Http\Controllers\ResourceIndexController;

#endregion

Route::get('{slug}', ResourceIndexController::class)
    ->name('resource.index');
