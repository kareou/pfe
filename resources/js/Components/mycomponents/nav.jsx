import React from "react";
import { Link, Head } from "@inertiajs/react";
import { CiSearch } from "react-icons/ci";

function nav({ auth }) {
    return (
        <div>
            <nav className="flex justify-around">
                <Link href={route("welcome")}> Logo </Link>
                <div className="flex gap-2 ">
                    <div className="flex shadow-md text-center border rounded-md px-2 border-my_gray">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault(); // Prevent the default form submission behavior
                                console.log("search");
                            }}
                        >
                            <input
                                className="search h-7 bg-my_white w-60 border-none focus:outline-none focus:ring-0"
                                type="search"
                                placeholder="Find a movie"
                            />
                            {/* Add a submit button here if needed */}
                        </form>

                        <CiSearch className="text-my_gray2 text-lg text-center h-7" />
                    </div>
                    <button className="">☰ Menu</button>
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
                            <Link
                                className=" shadow-md rounded text-center font-semibold bg-my_red w-20 text-my_white"
                                href={route("login")}
                            >
                                Log in
                            </Link>

                            <Link
                                className=" shadow-md rounded text-center font-semibold bg-my_gray w-20 text-my_white"
                                href={route("register")}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default nav;
