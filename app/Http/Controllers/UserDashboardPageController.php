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

        return Inertia::render('Dashboard/DashboardUserPage', [
            "auth" => auth()->user(),
            "book_tersedia" => $book_tersedia,
            "buku_dipesan" => Book::where('status', "Dipinjam")->where('peminjam', auth()->user()->name)->get()
        ]);
    }

    // (route konfirmasipengembalian)
    public function pengembalian_buku($id)
    {
        $data = Book::find($id);
        if ($data) {
            Book::where('id', $id)->update([
                'status' => 'Konfirmasi_pengembalian',
                'peminjam' => auth()->user()->name
            ]);

            return response()->json([
                "status" => 200,
                "message" => "Pengembalian akan di Validasi"
            ]);
        } else {
            return response()->json([
                "status" => 404,
                "message" => "Data tidak ditemukan"
            ]);
        }
    }
}
