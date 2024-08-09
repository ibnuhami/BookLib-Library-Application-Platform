<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use Illuminate\Http\Request;
use Inertia\Inertia;


use App\Models\Book;


class UserDashboardPageController extends Controller
{
    // Index function => merender dashboard page untuk user
    public function index()
    {
        $book_tersedia = new BookCollection(Book::where('status', 'Tersedia')->paginate(10));
        return Inertia::render('Dashboard/User', [
            "auth" => auth()->user(),
            "book_tersedia" => $book_tersedia,
            "buku_dipesan" => Book::where('status', "Dipinjam")->where('peminjam', auth()->user()->name)->get()
        ]);
    }
}
