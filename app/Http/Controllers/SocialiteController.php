<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirectUrl(route('login.callback'))->redirect();
    }

    public function callback()
    {
        $user = Socialite::driver('google')->redirectUrl(route('login.callback'))->user();
       dd($user);

    }

    // In RegisterController
    public function rredirect()
    {
        return Socialite::driver('google')->redirectUrl(route('register.callback'))->redirect();
    }

    public function rcallback()
    {
        $user = Socialite::driver('google')->redirectUrl(route('register.callback'))->user();
        // ...
    }
}
