<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DaftarBukuController extends Controller
{
    public function index()
    {
        $book_tersedia = new BookCollection(Book::where('status', 'Tersedia')->paginate(10));
        return Inertia::render('DaftarBuku/DaftarBuku', [
            'book_tersedia' => $book_tersedia
        ]);
    }

    // Function untuk mengubah data ke Konfirmasi Peminjaman (fitur peminjaman)
    public function store(Request $request, $id)
    {
        $data = Book::findOrFail($id);
        $data->update([
            'status' => 'Konfirmasi_pinjam',
            'peminjam' => auth()->user()->name
        ]);

        return response()->json([
            "status" => 200,
            "message" => "Success Meminjam Buku"
        ]);
    }
}
