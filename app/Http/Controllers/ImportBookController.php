<?php

namespace App\Http\Controllers;

use App\Imports\BookImport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ImportBookController extends Controller
{
    public function index()
    {
        return Inertia::render('Import/Import');
    }

    public function store(Request $request)
    {
        // dd($request);
        // try {
        Excel::import(new BookImport, $request->file('file'));
        return redirect(route('adminDashboard'))->with('message', 'Berhasil Import Buku');
        // } catch (\Throwable $e) {
        //     return back()->with('message', $e);
        // }
    }
}
