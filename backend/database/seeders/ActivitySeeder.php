<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Activity;

class ActivitySeeder extends Seeder
{
    public function run(): void
    {
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Activity::truncate();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // ── BENTO ─────────────────────────────
        $bentoItems = [
            ['bento_size' => 'large',  'title' => 'High Ropes',    'description' => 'Traverse the canopy on our suspension bridges and giant zip lines.', 'image' => 'high_ropes_adventure_1778779353538.png', 'adult_price' => 180, 'child_price' => 90],
            ['bento_size' => 'medium', 'title' => 'Zip Line',      'description' => null, 'image' => 'activity_zipline.png', 'adult_price' => 150, 'child_price' => 75],
            ['bento_size' => 'small',  'title' => 'Climbing Wall', 'description' => null, 'image' => 'activity_climbing.png', 'adult_price' => 120, 'child_price' => 60],
            ['bento_size' => 'small',  'title' => 'Ninja Course',  'description' => null, 'image' => 'activity_navigation.png', 'adult_price' => 100, 'child_price' => 50],
        ];

        foreach ($bentoItems as $i => $item) {
            Activity::create(array_merge($item, [
                'category'   => 'bento',
                'sort_order' => $i,
                'is_active'  => true,
            ]));
        }

        // ── ADRENALINE ───────────────────────
        $adrenalineItems = [
            ['title' => 'High Ropes',     'badge' => 'High Intensity', 'age_range' => 'Age 6+',   'duration' => '2 Hours',   'image' => 'activity_biking.png', 'adult_price' => 180, 'child_price' => 90],
            ['title' => 'Zipline',        'badge' => 'Epic Height',    'age_range' => 'Age 10+',  'duration' => '45 Min',    'image' => 'activity_zipline.png', 'adult_price' => 150, 'child_price' => 75],
            ['title' => 'Climbing Wall',  'badge' => 'Skill Based',    'age_range' => 'Age 5+',   'duration' => '1 Hour',    'image' => 'activity_climbing.png', 'adult_price' => 120, 'child_price' => 60],
            ['title' => 'Laser Game',     'badge' => 'Elite Skill',    'age_range' => 'Age 7+',   'duration' => '30 Min',    'image' => 'premium_photo-1677870728119-52aef052d7ef.avif', 'adult_price' => 200, 'child_price' => 100],
            ['title' => 'Trampoline Park','badge' => 'Pure Fun',       'age_range' => 'All Ages', 'duration' => '1 Hour',    'image' => 'photo-1751235600651-94bbbeb29567.avif', 'adult_price' => 90, 'child_price' => 70],
            ['title' => 'Karting',        'badge' => 'High Speed',     'age_range' => 'Age 14+',  'duration' => '15 Min',    'image' => 'photo-1505570554449-69ce7d4fa36b.avif', 'adult_price' => 300, 'child_price' => 150],
            ['title' => 'Paintball',      'badge' => 'Tactical',       'age_range' => 'Age 12+',  'duration' => '1.5 Hours', 'image' => 'photo-1588432815128-363254491e4e.avif', 'adult_price' => 250, 'child_price' => 125],
            ['title' => 'Laser Game Pro', 'badge' => 'Sci-Fi Fan',     'age_range' => 'Age 7+',   'duration' => '30 Min',    'image' => 'istockphoto-1290872085-612x612.webp', 'adult_price' => 220, 'child_price' => 110],
        ];

        foreach ($adrenalineItems as $i => $item) {
            Activity::create(array_merge($item, [
                'category'   => 'adrenaline',
                'bento_size' => null,
                'sort_order' => $i,
                'is_active'  => true,
            ]));
        }

        // ── KIDS ─────────────────────────────
        $kidsItems = [
            ['title' => 'Interactive Mini Farm', 'description' => 'Meet our dwarf goats, rabbits, and ponies in a fun and educational setting.', 'age_range' => 'From 3 years', 'image' => 'premium_photo-1663090902336-a9b2c07a210d.avif', 'adult_price' => 100, 'child_price' => 50],
            ['title' => 'Creative Workshops', 'description' => 'Insect hotel building and stone painting with our qualified animators.', 'age_range' => 'Every 2 hours', 'image' => 'photo-1755187338391-91b31b053d91.avif', 'adult_price' => 80, 'child_price' => 60],
            ['title' => 'Giant Slides', 'description' => 'Inflatable structures and obstacle courses for safe fun.', 'age_range' => 'Unlimited access', 'image' => 'premium_photo-1661547762303-1b99bfd73f09.avif', 'adult_price' => 70, 'child_price' => 50],
        ];

        foreach ($kidsItems as $i => $item) {
            Activity::create(array_merge($item, [
                'category'   => 'kids',
                'bento_size' => null,
                'sort_order' => $i,
                'is_active'  => true,
            ]));
        }

        // ── KARTING ──────────────────────────
        $kartingItems = [
            ['title' => 'Off-Road Karting', 'description' => 'Master the dirt track with our high-performance electric karts.', 'image' => 'photo-1505570554449-69ce7d4fa36b.avif', 'adult_price' => 300, 'child_price' => 150],
            ['title' => 'Off-Road Karting', 'description' => 'Master the dirt track with our high-performance electric karts.', 'image' => 'photo-1505570554449-69ce7d4fa36b.avif', 'adult_price' => 300, 'child_price' => 150],
        ];

        foreach ($kartingItems as $i => $item) {
            Activity::create(array_merge($item, [
                'category'   => 'karting',
                'bento_size' => null,
                'sort_order' => $i,
                'is_active'  => true,
            ]));
        }

        // ── NATURE ───────────────────────────
        $natureItems = [
            ['title' => 'Zen Garden', 'description' => 'A Japanese-inspired landscaped space with a water cascade.', 'badge' => 'BREATHE', 'image' => 'premium_photo-1710846919368-91fb1945e6db.avif', 'adult_price' => 0, 'child_price' => 0],
            ['title' => 'Outdoor Yoga', 'description' => 'Group sessions every morning facing the rising sun.', 'badge' => 'ZEN', 'image' => 'photo-1755187338391-91b31b053d91.avif', 'adult_price' => 120, 'child_price' => 80],
        ];

        foreach ($natureItems as $i => $item) {
            Activity::create(array_merge($item, [
                'category'   => 'nature',
                'bento_size' => null,
                'sort_order' => $i,
                'is_active'  => true,
            ]));
        }

        // ── EVENTS ───────────────────────────
        $eventItems = [
            ['title' => 'Team Building', 'description' => 'Strengthen bonds and build trust with customized challenges on our high ropes courses.', 'image' => 'photo-1610070835951-156b6921281d.avif', 'adult_price' => 500, 'child_price' => 500],
            ['title' => 'Birthday Parties', 'description' => 'Celebrate in style with action-packed packages across all activity zones.', 'image' => 'photo-1758275557553-0c46c061d43e.avif', 'adult_price' => 350, 'child_price' => 300],
            ['title' => 'School & Groups', 'description' => 'Educational nature walks and fun-filled outdoor experiences designed for all sizes.', 'image' => 'istockphoto-1492557867-612x612.webp', 'adult_price' => 150, 'child_price' => 100],
        ];

        foreach ($eventItems as $i => $item) {
            Activity::create(array_merge($item, [
                'category'   => 'event',
                'bento_size' => null,
                'sort_order' => $i,
                'is_active'  => true,
            ]));
        }
    }
}