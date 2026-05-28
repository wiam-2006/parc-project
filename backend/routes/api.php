<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\MenuItemController;
use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\ImageUploadController;
use App\Http\Controllers\Api\BookingController;

Route::post('/contact', [ContactController::class, 'store']);

Route::apiResource('menu-items', MenuItemController::class);

Route::get('/activities', [ActivityController::class, 'index']);
Route::post('/activities', [ActivityController::class, 'store']);
Route::get('/activities/{category}', [ActivityController::class, 'byCategory']);

Route::post('/upload-image', [ImageUploadController::class, 'upload']);

Route::post('/bookings', [BookingController::class, 'store']);

Route::get('/test', function () {
    return response()->json(['ok' => true]);
});