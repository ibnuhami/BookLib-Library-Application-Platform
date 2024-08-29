<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\BookCatalog;


class AdminDashboardPageController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Admin');
    }
    public function edit(Request $request)
    {
        
    }
}
