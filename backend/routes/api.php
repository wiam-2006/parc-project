<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\EventInquiryController;
use App\Http\Controllers\Api\MenuItemController;
use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\ImageUploadController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\MembershipPlanController;
use App\Http\Controllers\Api\NewsletterController;

Route::post('/contact', [ContactController::class, 'store']);
Route::post('/event-inquiries', [EventInquiryController::class, 'store']);

Route::apiResource('menu-items', MenuItemController::class);
Route::post('/reservations', [ReservationController::class, 'store']);
Route::apiResource('membership-plans', MembershipPlanController::class);
Route::post('/newsletter', [NewsletterController::class, 'store']);

Route::get('/activities', [ActivityController::class, 'index']);
Route::post('/activities', [ActivityController::class, 'store']);
Route::get('/activities/{category}', [ActivityController::class, 'byCategory']);

Route::post('/upload-image', [ImageUploadController::class, 'upload']);

Route::post('/bookings', [BookingController::class, 'store']);

Route::get('/test', function () {
    return response()->json(['ok' => true]);
});
