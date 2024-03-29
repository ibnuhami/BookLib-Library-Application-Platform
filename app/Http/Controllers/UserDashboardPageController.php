<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;


use App\Models\Book;


class UserDashboardPageController extends Controller
{
    // Index function => merender dashboard page untuk user
    public function index()
    {
        return Inertia::render('Dashboard/DashboardUserPage', [
            "auth" => auth()->user(),
            "book_tersedia" => Book::where('status', 'Tersedia')->get(),
            "buku_dipesan" => Book::where('status', "Dipinjam")->where('peminjam', auth()->user()->name)->get()
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
