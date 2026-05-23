<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    // GET /api/menu-items
    public function index()
{
    $items = MenuItem::orderBy('category')->get();
    return response()->json([
        'success' => true,
        'data' => $items
    ]);
}
    // POST /api/menu-items
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string',
            'category'    => 'required|string',
            'description' => 'required|string',
            'price'       => 'required|numeric|min:0',
            'image'       => 'nullable|string',
            'available'   => 'boolean',
            'order'       => 'integer',
        ]);

        $item = MenuItem::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Menu item created',
            'data'    => $item
        ], 201);
    }

    // PUT /api/menu-items/{id}
    public function update(Request $request, $id)
    {
        $item = MenuItem::findOrFail($id);

        $validated = $request->validate([
            'name'        => 'sometimes|string',
            'category'    => 'sometimes|string',
            'description' => 'sometimes|string',
            'price'       => 'sometimes|numeric|min:0',
            'image'       => 'nullable|string',
            'available'   => 'boolean',
            'order'       => 'integer',
        ]);

        $item->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Menu item updated',
            'data'    => $item
        ]);
    }

    // DELETE /api/menu-items/{id}
    public function destroy($id)
    {
        $item = MenuItem::findOrFail($id);
        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Menu item deleted'
        ]);
    }

    public function show($id)
    {
        $item = MenuItem::findOrFail($id);
        return response()->json([
            'success' => true,
            'data'    => $item
        ]);
    }
}