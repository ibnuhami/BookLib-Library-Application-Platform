<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class BookCatalog extends Model
{
    use HasFactory;
    protected $table = "tb_books_catalog";
    protected $with = ['BookDetail'];

    public function BookDetail() : HasOne
    {
        return $this->hasOne(BookDetail::class, 'inventory_id', 'inventory_id');
    }

    public function BookFilter(): BelongsTo
    {
        return $this->belongsTo(BookFilter::class, 'id', 'status');
    }
}
