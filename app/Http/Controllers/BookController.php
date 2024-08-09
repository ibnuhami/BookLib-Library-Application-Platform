<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function page()
    {
        $book_tersedia = new BookCollection(Book::where('status', 'Tersedia')->paginate(10));
        return Inertia::render('Book/Book', [
            'book_tersedia' => $book_tersedia
        ]);
    }

    public function reserved(Request $request, $id)
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

    public function confirmationReturned($id)
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

    public function destroy($id)
    {
        Book::destroy($id);
        return back();
    }

    public function checkout($id)
    {
        $data = Book::findOrFail($id);
        $data->update([
            'status' => 'Dipinjam',
        ]);

        return redirect()->back()->with('message', 'Berhasil konfirmasi pinjam');
    }

    public function reject($id)
    {
        $data = Book::findOrFail($id);
        $user = User::where('name', $data->peminjam)->first();
        $user->jumlah_pinjam -= 1;
        $user->save();

        $data->update([
            'status' => 'Tersedia',
            'peminjam' => '-'
        ]);
    }
}
