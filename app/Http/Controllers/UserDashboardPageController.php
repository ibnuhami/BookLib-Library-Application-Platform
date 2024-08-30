<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use App\Models\BookCatalog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserDashboardPageController extends Controller
{
    // Index function => merender dashboard page untuk user
    public function index()
    {
        $book_available = new BookCollection(BookCatalog::where('status', 'available')->paginate(10));
        $book_reserved = BookCatalog::where('user', auth()->user()->name);

        return Inertia::render('Dashboard/User', [
            "book_available" => $book_available,
            "book_reserved" => $book_reserved
        ]);
    }
}
