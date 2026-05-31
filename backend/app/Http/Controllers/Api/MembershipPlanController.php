<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MembershipPlan;
use Illuminate\Http\Request;

class MembershipPlanController extends Controller
{
    // GET /api/membership-plans
    public function index()
    {
        $plans = MembershipPlan::where('active', true)
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $plans
        ]);
    }

    // POST /api/membership-plans
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => 'required|string',
            'price'      => 'required|string',
            'features'   => 'required|array',
            'is_popular' => 'boolean',
            'btn_text'   => 'required|string',
            'order'      => 'integer',
            'active'     => 'boolean',
        ]);

        $plan = MembershipPlan::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Membership plan created',
            'data'    => $plan
        ], 201);
    }

    // PUT /api/membership-plans/{id}
    public function update(Request $request, $id)
    {
        $plan = MembershipPlan::findOrFail($id);

        $validated = $request->validate([
            'name'       => 'sometimes|string',
            'price'      => 'sometimes|string',
            'features'   => 'sometimes|array',
            'is_popular' => 'boolean',
            'btn_text'   => 'sometimes|string',
            'order'      => 'integer',
            'active'     => 'boolean',
        ]);

        $plan->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Membership plan updated',
            'data'    => $plan
        ]);
    }

    // DELETE /api/membership-plans/{id}
    public function destroy($id)
    {
        $plan = MembershipPlan::findOrFail($id);
        $plan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Membership plan deleted'
        ]);
    }

    // GET /api/membership-plans/{id}
    public function show($id)
    {
        $plan = MembershipPlan::findOrFail($id);

        return response()->json([
            'success' => true,
            'data'    => $plan
        ]);
    }
}
