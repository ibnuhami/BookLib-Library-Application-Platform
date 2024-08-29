<?php

namespace Database\Seeders;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = [
            [
                'isbn' => '9781234567897',
                'title' => 'Laravel for Beginners',
                'author' => 'John Doe',
                'synopsis' => 'An introduction to Laravel framework.',
                'language' => 'English',
                'location' => 'Shelf A1',
            ],
            [
                'isbn' => '9782345678901',
                'title' => 'Advanced PHP Programming',
                'author' => 'Jane Smith',
                'synopsis' => 'Deep dive into PHP for advanced users.',
                'language' => 'English',
                'location' => 'Shelf A2',
            ],
            [
                'isbn' => '9783456789012',
                'title' => 'Web Development with Vue.js',
                'author' => 'Alice Johnson',
                'synopsis' => 'Learn Vue.js step by step.',
                'language' => 'English',
                'location' => 'Shelf B1',
            ],
            [
                'isbn' => '9784567890123',
                'title' => 'Mastering React',
                'author' => 'Bob Brown',
                'synopsis' => 'Comprehensive guide to React.js.',
                'language' => 'English',
                'location' => 'Shelf B2',
            ],
        ];

        DB::table('tb_books_detail')->insert($books);

        DB::table('tb_books_filter')->insert([
            [
                'status' => 'available'
            ],
            [
                'status' => 'checkout'
            ],
            [
                'status' => 'reserved'
            ],
            [
                'status' => 'lost'
            ],
        ]);

        DB::table('tb_books_catalog')->insert([
            [
                'inventory_id' => 1,
                'status' => 1,
            ],
            [
                'inventory_id' => 2,
                'status' => 2,
            ],
            [
                'inventory_id' => 3,
                'status' => 3,
            ],
            [
                'inventory_id' => 4,
                'status' => 4,
            ],
        ]);
    }
}
