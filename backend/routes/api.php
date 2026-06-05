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
use App\Http\Controllers\Api\MembershipController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminStatsController;
use App\Http\Controllers\Api\AdminEntityController;

Route::post('/contact', [ContactController::class, 'store']);
Route::post('/event-inquiries', [EventInquiryController::class, 'store']);

Route::apiResource('menu-items', MenuItemController::class);
Route::post('/reservations', [ReservationController::class, 'store']);
Route::apiResource('membership-plans', MembershipPlanController::class);
Route::post('/memberships', [MembershipController::class, 'store']);
Route::post('/newsletter', [NewsletterController::class, 'store']);

Route::get('/activities', [ActivityController::class, 'index']);
Route::post('/activities', [ActivityController::class, 'store']);
Route::get('/activities/{category}', [ActivityController::class, 'byCategory']);

Route::post('/upload-image', [ImageUploadController::class, 'upload']);

Route::post('/bookings', [BookingController::class, 'store']);

Route::get('/test', function () {
    return response()->json(['ok' => true]);
});

Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/stats', [AdminStatsController::class, 'index']);
        Route::get('/tables', [AdminEntityController::class, 'tables']);
        Route::get('/tables/{table}', [AdminEntityController::class, 'index']);
        Route::post('/tables/{table}', [AdminEntityController::class, 'store']);
        Route::put('/tables/{table}/{id}', [AdminEntityController::class, 'update']);
        Route::delete('/tables/{table}/{id}', [AdminEntityController::class, 'destroy']);
    });
});
