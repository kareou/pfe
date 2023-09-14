<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;


class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function addfavorite(Request $request)
    {

        //get the user
        $user = $request->user();
        $favorites = $user->favorite;
        if(is_null($favorites)) {
            $favorites = [];
        }

        foreach ($favorites as $index => $item) {
            if ($item == $request->movie_id) {
                unset($favorites[$index]);
                $user->favorite = $favorites;
                $user->save();
                return Redirect::back();
            }
        }

        array_push($favorites, $request->movie_id);
        $user->favorite = $favorites;
        $user->save();


        return Redirect::back();
    }

    public function addwatchlist(Request $request)
    {

        //get the user
        $user = $request->user();
        $watchlist = $user->watchlist;
        if(is_null($watchlist)) {
            $watchlist = [];
        }
        //check if alr exist
        foreach ($watchlist as $index => $item) {
            if ($item == $request->movie_id) {
                unset($watchlist[$index]);
                $user->watchlist = $watchlist;
                $user->save();
                return redirect()->back()->refresh();
            }
        }


        array_push($watchlist, $request->movie_id);
        $user->watchlist = $watchlist;
        $user->save();
}

    public function addwatched(Request $request)
    {

        //get the user
        $user = $request->user();
        $watched = $user->watched;
        if(is_null($watched)) {
            $watched = [];
        }

        foreach ($watched as $index => $item) {
            if ($item == $request->movie_id) {
                unset($watched[$index]);
                $user->watched = $watched;
                $user->save();
                return Redirect::back();
            }
        }

        array_push($watched, $request->movie_id);
        $user->watched = $watched;
        $user->save();
    }

    public function updateimg(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5048',
        ]);
        $user = $request->user();
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public');
        } else {
            $imagePath = null;
        }
        $user->image = $imagePath;
        $user->save();
        return Redirect::back();
    }
}
