import React from 'react'
import { Link, Head } from "@inertiajs/react";

function nav( {auth}) {
  return (
    <div>
    <nav>
        <Link href={route("welcome")}> Logo </Link>
        <div>
            <button className=" h-7 border-black border">
                 ☰ Menu</button>
            <input
                className=" h-7 border"
                type="search"
                placeholder="Search"
            />
        </div>
        <div className="flex gap-4">
            {auth.user ? (
                <Link
                    href={route("dashboard")}
                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                    Dashboard
                </Link>
            ) : (
                <>
                    <Link href={route("login")}>Log in</Link>

                    <Link href={route("register")}>Register</Link>
                </>
            )}
        </div>
    </nav>
</div>
  )
}

export default nav
