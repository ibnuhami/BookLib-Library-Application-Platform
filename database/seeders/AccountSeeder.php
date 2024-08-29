<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'nis' => 123,
            'email' => 'admin@example.com',
            'password' => Hash::make('admin@123'),
            'type' => 'admin'
        ]);

        User::create([
            'name' => 'User',
            'nis' => 456,
            'email' => 'user@example.com',
            'password' => Hash::make('user@123'),
        ]);
    }
}
