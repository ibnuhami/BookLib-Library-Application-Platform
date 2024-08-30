<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use App\Models\BookCatalog;
use App\Models\BookFilter;
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
        $book_available = new BookCollection(BookFilter::with('BookCatalog')->where('status', 'available')->get());

        return $book_available;
    }

    public function getCheckoutBook()
    {
        $book_checkout = new BookCollection(BookFilter::where('status', 'checkout')->get());

        return $book_checkout;
    }

    public function getReservedBook()
    {
        $book_reserved = new BookCollection(BookFilter::where('status', 'reserved')->get());

        return $book_reserved;
    }

    public function getLostBook()
    {
        $book_lost = new BookCollection(BookFilter::where('status', 'lost')->get());

        return $book_lost;
    }
}
