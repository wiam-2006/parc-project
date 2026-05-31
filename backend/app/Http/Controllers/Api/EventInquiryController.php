<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EventInquiry;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EventInquiryController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'regex:/^[0-9]{10}$/'],
            'event_type' => [
                'required',
                'string',
                Rule::in([
                    'Birthday Party',
                    'Festival',
                    'Family Day',
                    'Kids Event',
                    'Corporate Event',
                ]),
            ],
            'preferred_date' => ['required', 'date', 'after_or_equal:today'],
            'message' => ['required', 'string'],
        ]);

        $eventInquiry = EventInquiry::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Event inquiry submitted successfully',
            'data' => $eventInquiry,
        ], 201);
    }
}
