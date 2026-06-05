<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AdminStatsController extends Controller
{
    public function index()
    {
        $tables = [
            'users',
            'bookings',
            'reservations',
            'memberships',
            'activities',
            'menu_items',
            'membership_plans',
            'contacts',
            'event_inquiries',
            'newsletter_subscribers',
        ];

        $counts = collect($tables)
            ->filter(fn ($table) => Schema::hasTable($table))
            ->mapWithKeys(fn ($table) => [$table => DB::table($table)->count()]);

        $revenue = 0;
        if (Schema::hasTable('bookings')) {
            $revenue += (float) DB::table('bookings')->sum('total_price');
        }
        if (Schema::hasTable('memberships')) {
            $revenue += (float) DB::table('memberships')->sum('total_price');
        }

        return response()->json([
            'counts' => $counts,
            'revenue' => $revenue,
            'recent' => [
                'bookings' => $this->recent('bookings'),
                'restaurant_reservations' => $this->recent('reservations'),
                'memberships' => $this->recent('memberships'),
            ],
        ]);
    }

    private function recent(string $table): array
    {
        if (!Schema::hasTable($table)) {
            return [];
        }

        return DB::table($table)
            ->latest('created_at')
            ->limit(5)
            ->get()
            ->map(fn ($row) => (array) $row)
            ->all();
    }
}
