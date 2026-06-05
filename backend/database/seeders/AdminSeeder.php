<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@funzone.local'],
            [
                'name' => 'Funzone Admin',
                'password' => Hash::make('Admin@12345'),
                'role' => 'admin',
                'is_admin' => true,
            ]
        );
    }
}
