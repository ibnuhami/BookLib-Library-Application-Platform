<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Book;


class AdminDashboardPageController extends Controller
{
    public function index()
    {
        $book_tersedia = new BookCollection(Book::where('status', 'Tersedia')->paginate(10));
        return Inertia::render('Dashboard/Admin', [
            "isAdmin" => auth()->user()->isAdmin,
            "book_tersedia" => $book_tersedia,
            "book_dipinjam" => Book::where('status', 'Dipinjam')->get(),
            "book_k_pengembalian" => Book::where('status', 'Konfirmasi_pengembalian')->get(),
            "book_k_pinjam" => Book::where('status', 'Konfirmasi_pinjam')->get(),
        ]);
    }

    public function edit(Request $request)
    {
        $data = Book::findOrFail($request->id);
        if ($data) {
            return Inertia::render('Dashboard/Admin/Edit', [
                "data" => Book::where('id', $request->id)->first()
            ]);
        } else {
            return response()->json([
                "status" => 404,
                "message" => "Gagal data tidak ditemukan",
            ]);
        }
    }
}
