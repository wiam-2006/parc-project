<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MenuItem;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        MenuItem::insert([
            [
                'name'        => 'Wild Greens Salad',
                'category'    => 'Fresh Harvest',
                'description' => 'Foraged arugula, pine nuts, goat cheese, cider vinaigrette.',
                'price'       => 18.00,
                'available'   => true,
                'order'       => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Roasted Root Medley',
                'category'    => 'Fresh Harvest',
                'description' => 'Charred forest carrots, parsnips, beets, wild thyme butter.',
                'price'       => 22.00,
                'available'   => true,
                'order'       => 2,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Oak-Smoked Venison',
                'category'    => 'Fire & Grill',
                'description' => 'Locally sourced venison, juniper berry reduction, gold potatoes.',
                'price'       => 38.00,
                'available'   => true,
                'order'       => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Cedar Plank Salmon',
                'category'    => 'Fire & Grill',
                'description' => 'Wild caught, grilled on cedar, lemon-herb emulsion.',
                'price'       => 34.00,
                'available'   => true,
                'order'       => 2,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ]);
    }
}