import React from "react";
import { Link, Head } from "@inertiajs/react";
import { CiSearch } from "react-icons/ci";
import Dropdown from "./profile_dropdown";

function nav({ auth }) {


    return (
        <div>
            <nav className="flex justify-around place-items-center">
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
                        <Dropdown user={auth.user} />
                    ) : (
                        <>
                            <Link
                                className=" shadow-md rounded  flex justify-center place-items-center text-center font-semibold bg-my_red w-20 h-8 text-my_white"
                                href={route("login")}
                            >
                                Log in
                            </Link>

                            <Link
                                className=" shadow-md rounded flex justify-center place-items-center text-center font-semibold bg-my_gray w-20 h-8 text-my_white"
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
