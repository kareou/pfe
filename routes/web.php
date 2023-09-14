<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\SocialiteController;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/MoviePage/{movie}',function($movie){
    return Inertia::render('MoviePage',[
        'movie' => $movie
    ]);
})->name('movie');

Route::get('/TvPage/{tv}',function($tv){
    return Inertia::render('TvPage',[
        'movie' => $tv
    ]);
})->name('tv');

Route::get('/login/redirect', [SocialiteController::class, 'redirect'])->name('login.redirect');
Route::get('/login/callback', [SocialiteController::class, 'callback'])->name('login.callback');

Route::get('/register/redirect', [SocialiteController::class, 'rredirect'])->name('register.redirect');
Route::get('/register/callback', [SocialiteController::class, 'rcallback'])->name('register.callback');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/favorite', [ProfileController::class, 'addfavorite'])->name('addfavorite');
Route::post('/watchlist', [ProfileController::class, 'addwatchlist'])->name('addwatchlist');
Route::post('/watched', [ProfileController::class, 'addwatched'])->name('addwatched');

Route::get('/shows/{keyword}-{type}-{name}',function($keyword,$name,$type){
    return Inertia::render('Keywordl',[
        'keyword' => $keyword,
        'type' => $type,
        'name' => $name
    ]);
});

Route::get('/actor/{actor}',function($actor){
    return Inertia::render('actor',[
        'actor' => $actor
    ]);
})->name('actors');

Route::get('/search',function(){
    return Inertia::render('Search',[
        'keyword' => request()->searchTerm
    ]);
})->name('search');

Route::get('/edit',function(){
    return Inertia::render('Profile/Update');
})->name('edit');

Route::get('/movies',function(){
    return Inertia::render('movies');
})->name('movies');

Route::get('/tvshows',function(){
    return Inertia::render('tvs');
})->name('tvshows');

Route::post('/update', [ProfileController::class, 'updateimg'])->name('updateimg');

require __DIR__.'/auth.php';
