<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\JsonResponse;

class ActivityController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            'image' => 'required|string',
        ]);

        $activity = Activity::create([
            'title' => $request->title,
            'category' => $request->category,
            'image' => $request->image,
            'description' => $request->description,
            'badge' => $request->badge,
            'age_range' => $request->age_range,
            'duration' => $request->duration,
            'sort_order' => 0,
            'is_active' => true,
        ]);

        return response()->json([
            'message' => 'Activity created successfully',
            'data' => $activity
        ]);
    }

    public function index(): JsonResponse
    {
        $activities = Activity::active()
            ->ordered()
            ->get()
            ->groupBy('category');

        return response()->json([
            'bento'      => $this->formatBento($activities->get('bento', collect())),
            'adrenaline' => $this->formatAdrenaline($activities->get('adrenaline', collect())),
            'kids'       => $this->formatKids($activities->get('kids', collect())),
            'karting'    => $this->formatKarting($activities->get('karting', collect())),
            'nature'     => $this->formatOneCollection($activities->get('nature', collect())),
            'event'      => $this->formatOneCollection($activities->get('event', collect())),
        ]);
    }

    public function byCategory(string $category): JsonResponse
    {
        $allowed = ['bento', 'adrenaline', 'kids', 'karting', 'nature', 'event'];

        if (!in_array($category, $allowed)) {
            return response()->json(['message' => 'Category not found.'], 404);
        }

        $activities = Activity::active()
            ->category($category)
            ->ordered()
            ->get();

        return response()->json(['data' => $activities->map(fn($a) => $this->formatOne($a))]);
    }

    // ── Private formatters (match React data shape exactly) ──────────

    private function formatBento($items): array
    {
        return $items->map(fn($a) => [
            'id'          => $a->id,
            'title'       => $a->title,
            'description' => $a->description,
            'image'       => $a->image_url,
            'size'        => $a->bento_size,
            'adult_price' => $a->adult_price,
            'child_price' => $a->child_price,
        ])->values()->toArray();
    }

    private function formatAdrenaline($items): array
    {
        return $items->map(fn($a) => [
            'id'          => $a->id,
            'title'       => $a->title,
            'badge'       => $a->badge,
            'age'         => $a->age_range,
            'duration'    => $a->duration,
            'image'       => $a->image_url,
            'adult_price' => $a->adult_price,
            'child_price' => $a->child_price,
        ])->values()->toArray();
    }

    private function formatKids($items): array
    {
        return $items->map(fn($a) => [
            'id'          => $a->id,
            'title'       => $a->title,
            'description' => $a->description,
            'image'       => $a->image_url,
            'age'         => $a->age_range,
            'adult_price' => $a->adult_price,
            'child_price' => $a->child_price,
        ])->values()->toArray();
    }

    private function formatKarting($items): array
    {
        return $items->map(fn($a) => [
            'id'          => $a->id,
            'title'       => $a->title,
            'description' => $a->description,
            'image'       => $a->image_url,
            'adult_price' => $a->adult_price,
            'child_price' => $a->child_price,
        ])->values()->toArray();
    }

    private function formatOneCollection($items): array
    {
        return $items->map(fn($a) => $this->formatOne($a))->values()->toArray();
    }

    private function formatOne(Activity $a): array
    {
        return [
            'id'          => $a->id,
            'title'       => $a->title,
            'description' => $a->description,
            'image'       => $a->image_url,
            'badge'       => $a->badge,
            'age'         => $a->age_range,
            'duration'    => $a->duration,
            'bento_size'  => $a->bento_size,
            'adult_price' => $a->adult_price,
            'child_price' => $a->child_price,
        ];
    }
}