<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use App\Models\BookCatalog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function page()
    {
        $book_tersedia = new BookCollection(BookCatalog::where('status', 'Tersedia')->paginate(10));
        return Inertia::render('Book/Book', [
            'book_tersedia' => $book_tersedia
        ]);
    }

    public function confirmationReturned($id)
    {
        $data = BookCatalog::find($id);

    }

    public function store(Request $request)
    {
        $validation = $request->validate([
            'title' => 'string|required',
            'author' => 'string|required',
            'isbn' => 'integer|required',
            'peminjam' => 'required',
        ]);

        BookCatalog::create($validation);

        return redirect()->back()->with('message', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $data = BookCatalog::findOrFail($id);

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
        BookCatalog::destroy($id);
        return back();
    }


    public function rejectConfirmation($id)
    {

    }


    public function getAvailableBook()
    {
        $book_available = new BookCollection(BookCatalog::where('status', 'available')->paginate(20));

        return $book_available;
    }

    public function getCheckoutBook()
    {
        $book_checkout = new BookCollection(BookCatalog::where('status', 'checkout')->paginate(20));

        return $book_checkout;
    }

    public function getReservedBook()
    {
        $book_reserved = new BookCollection(BookCatalog::where('status', 'reserved')->paginate(20));

        return $book_reserved;
    }

    public function getLostBook()
    {
        $book_lost = new BookCollection(BookCatalog::where('status', 'lost')->paginate(20));

        return $book_lost;
    }
}
