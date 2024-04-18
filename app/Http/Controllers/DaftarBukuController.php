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
        $user = auth()->user();
        if ($user->jumlah_pinjam >= 2) {
            return back()->with('message', 'Maaf, anda hanya dapat meminjam maksimal 2 buku');
        }

        $user->jumlah_pinjam++;
        $user->save();

        $buku = Book::findOrFail($id);
        $buku->update([
            'status' => 'Konfirmasi_pinjam',
            'peminjam' => $user->name
        ]);

        return redirect()->back()->with('message', 'Permintaan peminjaman buku berhasil dikirim.');
    }
}
