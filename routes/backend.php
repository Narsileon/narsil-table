<?php

#region USE

use Illuminate\Support\Facades\Route;
use Narsil\Tables\Http\Controllers\ResourceCreateController;
use Narsil\Tables\Http\Controllers\ResourceDestroyController;
use Narsil\Tables\Http\Controllers\ResourceEditController;
use Narsil\Tables\Http\Controllers\ResourceIndexController;
use Narsil\Tables\Http\Controllers\ResourceShowController;
use Narsil\Tables\Http\Controllers\ResourceStoreController;
use Narsil\Tables\Http\Controllers\ResourceUpdateController;

#endregion

Route::prefix('backend')->name('backend.')->middleware([
    'web',
    'auth',
    'verified',
    'can:backend_view',
])->group(function ()
{
    Route::get('{slug}/create', ResourceCreateController::class)
        ->name('resources.create');
    Route::delete('{slug}/delete', ResourceDestroyController::class)
        ->name('resources.delete');
    Route::get('{slug}/{id}/destroy', ResourceDestroyController::class)
        ->name('resources.destroy');
    Route::get('{slug}/{id}/edit', ResourceEditController::class)
        ->name('resources.edit');
    Route::get('{slug}', ResourceIndexController::class)
        ->name('resources.index');
    Route::get('{slug}/{id}', ResourceShowController::class)
        ->name('resources.show');
    Route::post('{slug}/store', ResourceStoreController::class)
        ->name('resources.store');
    Route::patch('{slug}/update', ResourceUpdateController::class)
        ->name('resources.update');
});
