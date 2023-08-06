<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;


class SocialiteController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirectUrl(route('login.callback'))->redirect();
    }

    public function callback()
    {
        $user = Socialite::driver('google')->redirectUrl(route('login.callback'))->user();
        $finduser = User::where('email', $user->email)->first();
        if ($finduser) {
            Auth::login($finduser);
            return redirect('/dashboard');
        }
        else {
            return redirect()->route('login')->withErrors([
                'email' => 'Email does not exist'
            ]);
        }

    }

    // In RegisterController
    public function rredirect()
    {
        return Socialite::driver('google')->redirectUrl(route('register.callback'))->redirect();
    }

    public function rcallback()
    {
        try {
            $google = Socialite::driver('google')->redirectUrl(route('register.callback'))->user();

            if (User::where('email', $google->email)->exists()) {
                return redirect()->route('login')->withErrors([
                    'email' => 'Email already exists'
                ]);
            }

            $user = User::create([
                'provider_id' => $google->id,
                'provider' => 'google',
                'name' => $google->name,
                'email' => $google->email,
                'provider_token' => $google->token,
                'provider_refresh_token' => $google->refreshToken,
                'image' => $google->avatar,
            ]);

            Auth::login($user);

            return redirect('/dashboard');
        }
        catch (\Exception $e) {
            return redirect()->route('login')->with('email', 'Email already exists');
        }


    }
}
