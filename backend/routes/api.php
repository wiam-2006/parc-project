<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\MenuItemController;

Route::post('/contact', [ContactController::class, 'store']);

Route::apiResource('menu-items', MenuItemController::class);

Route::get('/test', function () {
    return response()->json(['ok' => true]);
});