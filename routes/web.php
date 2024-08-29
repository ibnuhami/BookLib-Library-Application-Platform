<?php
use App\Http\Controllers\BookController;
use App\Http\Controllers\ImportBookController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', fn() => Inertia::render('Welcome'))
    ->name('welcome');

Route::controller(UserDashboardPageController::class)->middleware(['auth', 'CheckUser'])->group(function () {
    Route::get('/dashboard', 'index')
        ->name('user.dashboard');
});

Route::controller(BookController::class)->middleware(['auth'])->group(function () {
    Route::get('/book', 'page')
        ->name('book.page');

    Route::post('/confirmationreturned/{id}', 'confirmationReturned')
        ->name('book.confirmationReturned');

    Route::post('/book', 'store')
        ->name('book.store');

    Route::post('/checkout/{id}', 'checkout')
        ->name('book.checkout');

    Route::delete('/reject/{id}', 'rejectConfirmation')
        ->name('book.reject');

    Route::put('/update/{id}', 'update')
        ->name('book.update');

    Route::delete('/delete/{id}', 'destroy')
        ->name('book.delete');

    Route::get('/book/available', 'getAvailableBook')
        ->name('book.available');

    Route::get('/book/checkout', 'getCheckoutBook')
        ->name('book.checkout');

    Route::get('/book/reserved', 'getReservedBook')
        ->name('book.reserved');

    Route::get('/book/lost', 'getLostBook')
        ->name('book.lost');
});


Route::controller(AdminDashboardPageController::class)->middleware(['CheckAdmin', 'auth'])->group(function () {
    Route::get('/admin/dashboard', 'index')
        ->name('admin.dashboard');

    Route::get('/admin/dashboard/edit', 'edit')
        ->name('admin.editpage');
});


Route::controller(ImportBookController::class)->middleware(['CheckAdmin', 'auth'])->group(function () {
    Route::get('/admin/import', 'index')
        ->name('import.page');

    Route::post('/admin/import', 'store')
        ->name('import.store');
});

require __DIR__ . '/auth.php';
