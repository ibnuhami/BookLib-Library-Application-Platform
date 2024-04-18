<?php

use App\Http\Controllers\DaftarBukuController;
use App\Http\Controllers\ImportBookController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Namespace Controller
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserDashboardPageController;
use App\Http\Controllers\AdminDashboardPageController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', fn() => Inertia::render('Welcome'));

// Route User
// Dashboard User Route
Route::middleware(['auth', 'CheckUser'])->group(function () {
    // Dashboard User Page Route
    Route::get('/dashboard', [UserDashboardPageController::class, 'index'])->name('userDashboard');

    // Route Konfirmasi Pengembalian Buku
    Route::post('/dashboard/sistem/konfirmasipengembalianbuku/{id}', [UserDashboardPageController::class, 'pengembalian_buku'])->name('kembalibuku');
});

// Route Daftar Buku Page
Route::middleware(['auth'])->group(function () {
    // Route Daftarbuku page
    Route::get('/daftarbuku', [DaftarBukuController::class, 'index'])->name('daftarbukupage');

    // Route Untuk Mengirim data buku akan dipinjam
    Route::post('/dashboard/sistem/peminjamanbuku/{id}', [DaftarBukuController::class, 'store'])->name('pinjambuku');
});


// Route Admin
// Dashboard Admin Route
Route::middleware(['CheckAdmin', 'auth'])->group(function () {
    // Dashboard Admin Page Route
    Route::get('/admin/dashboardPage', [AdminDashboardPageController::class, 'index'])->name('adminDashboard');

    // Admin store book
    Route::post('/admin/dashboardPage/sistem/storethebook', [AdminDashboardPageController::class, 'store'])->name('storeBook');

    // Route Konfirmasi Peminjaman Buku
    Route::post('/admin/dasboardPage/sistem/konfirmasipinjambuku/{id}', [AdminDashboardPageController::class, 'konfirmasi_pinjam_buku'])->name('konfirmasipinjam');

    // Route Pembatalan Peminjaman Buku
    Route::delete('/admin/dashboardPage/sistem/pembatalanpinjam/{id}', [AdminDashboardPageController::class, 'pembatalan_pinjam_buku'])->name('pembatalanpinjam');

    // Route Konfirmasi Pengembalian Buku
    Route::post('/admin/dashboardPage/sistem/konfirmasipengembalian/{id}', [AdminDashboardPageController::class, 'konfirmasi_pengembalian_buku'])->name('konfirmasipengembalian');

    // Route Menampilakan page Edit Buku
    Route::get('/admin/dashboardPage/editbuku', [AdminDashboardPageController::class, 'edit'])->name('editbuku');

    // Route Update buku
    Route::post('/admin/dashboardPage/editbuku/{id}', [AdminDashboardPageController::class, 'update'])->name('updatebuku');

    // Route Show Buku
    // Route::get('/admin/dashboardPage/sistem/showbuku/{id}', [AdminDashboardPageController::class, 'show'])->name('showbuku');

    // Route Delete buku
    Route::delete('/admin/dashboardPage/sistem/deletebuku', [AdminDashboardPageController::class, 'destroy'])->name('deletebuku');
});


// Route Import Buku
Route::middleware(['CheckAdmin', 'auth'])->group(function () {
    Route::get('/admin/importbuku', [ImportBookController::class, 'index'])->name('pageimportbuku');
    Route::post('/admin/importbuku', [ImportBookController::class, 'store'])->name('importbuku');
});

// Profile Route -> saat ini di matikan terlebih dahulu
// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__ . '/auth.php';
