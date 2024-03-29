<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Facades\Log;

// Model Namespace
use App\Models\Book;


class AdminDashboardPageController extends Controller
{
    // protected $middleware = ['isAdmin']; // middleware isAdmin

    // Function untuk menampilkan Dashboard Admin
    public function index()
    {
        $book_tersedia = new BookCollection(Book::where('status', 'Tersedia')->paginate(10));
        return Inertia::render('Dashboard/DashboardAdminPage', [
            "isAdmin" => auth()->user()->isAdmin,
            "book_tersedia" => $book_tersedia,
            "book_dipinjam" => Book::where('status', 'Dipinjam')->get(),
            "book_k_pengembalian" => Book::where('status', 'Konfirmasi_pengembalian')->get(),
            "book_k_pinjam" => Book::where('status', 'Konfirmasi_pinjam')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = $request->validate([
            'title' => 'string|required',
            'author' => 'string|required',
            'isbn' => 'integer|required',
            'peminjam' => 'required',
        ]);

        Book::create($validation);

        return redirect()->back()->with('message', 'Data berhasil ditambah');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Menampilkan Page Edit
     */
    public function edit(Request $request)
    {
        $data = Book::findOrFail($request->id);
        if ($data) {
            return Inertia::render('Dashboard/admin/EditPage', [
                "data" => Book::where('id', $request->id)->first()
            ]);
        } else {
            return response()->json([
                "status" => 404,
                "message" => "Gagal data tidak ditemukan",
            ]);
        }
    }

    /**
     * Mengirim data untuk update data
     */
    public function update(Request $request, $id)
    {
        $data = Book::findOrFail($id);

        $validator = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'isbn' => 'required|integer',
            'peminjam' => 'required|string'
        ]);

        $data->update($validator);

        return redirect(route('adminDashboard'))->with('message', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(request $request)
    {
        Book::destroy($request->id);
        return back();
    }

    // Function konfirmasi peminjaman buku
    public function konfirmasi_pinjam_buku($id)
    {
        $data = Book::findOrFail($id);
        $data->update([
            'status' => 'Dipinjam',
        ]);

        return response()->json([
            "message" => "Success Konfirmasi Pinjam"
        ]);
    }

    // Function untuk pengembalian buku
    public function konfirmasi_pengembalian_buku($id)
    {
        $data = Book::findOrFail($id);
        Book::where('id', $id)->update([
            'status' => 'Tersedia',
            'peminjam' => '-'
        ]);

        return response()->json([
            "status" => 200,
            "message" => 'Berhasil konfirmasi Pengembalian. Buku akan kembali Tersedia'
        ]);
    }
}
