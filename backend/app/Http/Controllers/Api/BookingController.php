<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validation
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2',
            'email' => 'required|email',
            'phone' => 'required|string|min:8|max:20',
            'selectedDate' => 'required|date',
            'activeTime' => 'required|string',
            'adults' => 'required|integer|min:1',
            'children' => 'required|integer|min:0',
            'activity_id' => 'nullable|exists:activities,id',
            'street' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'payment_method' => 'required|in:online,local',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. Fetch Activity to get secure prices
        $activity = \App\Models\Activity::findOrFail($request->activity_id);
        
        $totalPrice = ($request->adults * $activity->adult_price) + ($request->children * $activity->child_price);

        // 3. Save to DB
        $booking = Booking::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'activity_id' => $request->activity_id,
            'street' => $request->street,
            'city' => $request->city,
            'postal_code' => $request->postal_code,
            'booking_date' => \Carbon\Carbon::parse($request->selectedDate)->format('Y-m-d'),
            'booking_time' => $request->activeTime,
            'adults' => $request->adults,
            'children' => $request->children,
            'adult_price' => $activity->adult_price,
            'child_price' => $activity->child_price,
            'total_price' => $totalPrice,
            'payment_method' => $request->payment_method,
            'payment_status' => $request->payment_method === 'online' ? 'paid' : 'unpaid',
            'status' => 'pending'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Your booking has been registered successfully!',
            'booking_id' => $booking->id
        ], 201);
    }
}