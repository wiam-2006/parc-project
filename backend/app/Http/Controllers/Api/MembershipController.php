<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Membership;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class MembershipController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'package' => 'required|string|in:3 months,6 months,1 year',
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'cin' => 'required|string|max:100',
            'phone' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'cardName' => 'required|string|max:255',
            'cardNumber' => 'required|string|min:12|max:25',
            'expiry' => 'required|string|max:7',
            'cvv' => 'required|string|min:3|max:4',
        ]);

        $packageMap = [
            '3 months' => ['months' => 3, 'price' => 180.00],
            '6 months' => ['months' => 6, 'price' => 340.00],
            '1 year' => ['months' => 12, 'price' => 620.00],
        ];

        $packageSettings = $packageMap[$validated['package']];

        $membershipId = $this->generateUniqueMembershipId();
        $startDate = Carbon::now();
        $expirationDate = $startDate->copy()->addMonths($packageSettings['months']);

        $membership = Membership::create([
            'membership_id' => $membershipId,
            'package' => $validated['package'],
            'duration_months' => $packageSettings['months'],
            'first_name' => $validated['firstName'],
            'last_name' => $validated['lastName'],
            'cin' => $validated['cin'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'payment_status' => 'success',
            'payment_method' => 'card',
            'card_holder_name' => $validated['cardName'],
            'card_last4' => substr(preg_replace('/\D/', '', $validated['cardNumber']), -4),
            'total_price' => $packageSettings['price'],
            'start_date' => $startDate->toDateString(),
            'expiration_date' => $expirationDate->toDateString(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Membership successfully created.',
            'data' => [
                'membership_id' => $membership->membership_id,
                'full_name' => $membership->first_name . ' ' . $membership->last_name,
                'package' => $membership->package,
                'start_date' => $membership->start_date->format('Y-m-d'),
                'expiration_date' => $membership->expiration_date->format('Y-m-d'),
                'payment_status' => $membership->payment_status,
                'total_price' => number_format($membership->total_price, 2),
            ],
        ], 201);
    }

    private function generateUniqueMembershipId(): string
    {
        do {
            $membershipId = 'FUNZ-' . strtoupper(Str::random(8));
        } while (Membership::where('membership_id', $membershipId)->exists());

        return $membershipId;
    }
}
