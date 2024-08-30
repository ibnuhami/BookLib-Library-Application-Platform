<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BookFilter extends Model
{
    use HasFactory;
    protected $table = 'tb_books_filter';
    protected $with = ['BookCatalog'];

    public function BookCatalog (): HasMany
    {
        return $this->hasMany(BookCatalog::class, 'status', 'id');
    }
}
