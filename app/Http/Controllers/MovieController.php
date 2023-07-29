<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieController extends Controller
{
    public function show($movie)
    {
        return Inertia::render('Moviepage')
        ->with('movie',$movie)
    }

    public function index()
    {
        return Inertia::render('Moviepage')
    }
}
