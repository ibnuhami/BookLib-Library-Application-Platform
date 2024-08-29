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
        $book_available = new BookCollection(BookCatalog::where('status', 'Tersedia')->paginate(10));
        $check_borrower = BookCatalog::where('status', "Dipinjam")->where('peminjam', auth()->user()->name)->get();

        return Inertia::render('Dashboard/User', [
            "auth" => auth()->user(),
            "book_available" => $book_available,
            "book_checkout" => $check_borrower
        ]);
    }
}
