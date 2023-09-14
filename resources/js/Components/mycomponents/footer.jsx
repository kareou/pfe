import React from "react";
import { usePage, Link } from "@inertiajs/react";

function footer() {
    const { auth } = usePage().props;

    return (
        <footer className="footer p-8 mt-10 bg-my_gray ">
            <div className="">
                <div className="flex justify-around flex-wrap gap-4 md:gap-0">
                    <div className="">
                        <h1 className="text-2xl font-bold text-my_white">
                            MovieDB
                        </h1>
                        <Link
                            href={auth.user ? "/profile" : "/login"}
                            className="text-my_white bg-my_red rounded flex p-2 drop-shadow-xl"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-my_gray2 hover:text-my_red"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="{2}"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                            <span className="bg-gradient-to-r from-[#0074E6] to-my_white  px-2 py-1 rounded bg-clip-text text-transparent font-bold">
                                {auth.user
                                    ? "welcom " + auth.user.name.toUpperCase()
                                    : "Join the community"}
                            </span>
                        </Link>
                    </div>
                    <div className="text-my_white">
                        <h1 className="text-xl font-bold text-my_white underline decoration-my_red">
                            The Basics
                        </h1>
                        <ul className="">
                            <li> About MovieDB</li>
                            <li>Contact Us</li>
                            <li>Support Forums</li>
                            <li>API</li>
                            <li>System Status</li>
                        </ul>
                    </div>
                    <div className="text-my_white">
                        <h1 className="text-xl font-bold text-my_white underline decoration-my_red">
                            Get Involved
                        </h1>
                        <ul className="">
                            <li> Contribution Bible</li>
                            <li>3rd Party Applications</li>
                            <li>Add New Movie</li>
                            <li>Add New TV Show</li>
                        </ul>
                    </div>
                    <div className="text-my_white">
                        <h1 className="text-xl font-bold text-my_white underline decoration-my_red">
                            Community
                        </h1>
                        <ul className="">
                            <li>Guidelines</li>
                            <li>Discussions</li>
                            <li>Leaderboard</li>
                            <li>Twitter</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default footer;
