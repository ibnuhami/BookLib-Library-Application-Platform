<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookDetail extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'tb_books_detail';
    protected $fillable = [
        'title',
        'author',
        'isbn',
        'status',
        'peminjam'
    ];

    protected $with = [];

    public function BookCatalog() : BelongsTo
    {
        return $this->belongsTo(BookCatalog::class, 'inventory_id', 'inventory_id');
    }
}
