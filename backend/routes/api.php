<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\EventInquiryController;
use App\Http\Controllers\Api\MenuItemController;
use App\Http\Controllers\Api\ReservationController;

Route::post('/contact', [ContactController::class, 'store']);
Route::post('/event-inquiries', [EventInquiryController::class, 'store']);

Route::apiResource('menu-items', MenuItemController::class);
Route::post('/reservations', [ReservationController::class, 'store']);

Route::get('/test', function () {
    return response()->json(['ok' => true]);
});
