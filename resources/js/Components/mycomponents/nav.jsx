import React from "react";
import { Link, Head } from "@inertiajs/react";
import { CiSearch } from "react-icons/ci";
import Dropdown from "./profile_dropdown";
import { BiUser } from "react-icons/bi";

function nav({ auth }) {
    const [toggle, setToggle] = React.useState(false);

    if (auth.user) {
        if (auth.user.image === null) {
            var image = "https://ui-avatars.com/api/?name=" + auth.user.name + "&background=random";
        } else {
            if (auth.user.image.includes("https://")) {
                var image = auth.user.image;
            } else {
                var tmp = auth.user.image.split("/");
                var image = "/storage/" + tmp[1];
            }
        }
    }
    const [searchTerm, setSearchTerm] = React.useState("");

    return (
        <>
            <div className=" md:block hidden">
                <nav className="flex justify-around place-items-center ">
                    <Link
                        className="rust text-my_gray2 text-xl"
                        href={route("welcome")}
                    >
                        Movie
                        <span className=" text-my_red">DB</span>
                    </Link>
                    <div className="flex gap-2 ">
                        <div className="flex shadow-md text-center border rounded-md px-2 border-my_gray">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    route("search", { keyword: searchTerm });
                                }}
                                className="flex"
                            >
                                <input
                                    className="search h-7 bg-my_white w-60 border-none focus:outline-none focus:ring-0"
                                    type="search"
                                    placeholder="Find a movie"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            <Link
                            href={route("search", { keyword: searchTerm })}
                            type="submit">
                                <CiSearch className="text-my_gray2 text-lg text-center h-7" />
                            </Link>
                            </form>
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
            <div className=" md:hidden block">
                <nav className="flex justify-around place-items-center ">
                    <button
                        onClick={() => {
                            setToggle(!toggle);
                            document.body.style.overflow = "hidden";
                        }}
                        className=" text-lg font-bold"
                    >
                        ☰
                    </button>
                    <div className="flexshadow-md text-center border rounded-md px-2 border-my_gray">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log(e.target.value);
                            }}
                            className="flex"
                        >
                            <input
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search h-7 bg-my_white w-60 border-none focus:outline-none focus:ring-0"
                                type="search"
                                placeholder="Find a movie"
                            />
                            <Link
                            href={route("search", { keyword: searchTerm })}
                            type="submit">
                                <CiSearch className="text-my_gray2 text-lg text-center h-7" />
                            </Link>
                        </form>
                    </div>

                    {toggle && (
                        <>
                            <div
                                onClick={() => {
                                    setToggle(!toggle);
                                    document.body.style.overflow = "auto";
                                }}
                                className="absolute top-0 w-[100%] h-[100%] bg-slate-700/75 z-10"
                            ></div>
                            <div className="absolute top-0 left-0 bg-my_gray2 w-40 h-[100%] z-20 drop-shadow-xl">
                                {!auth.user ? (
                                    <div className="flex gap-2 text-my_white border-b border-my_gray p-4">
                                        <BiUser className="text-lg" />
                                        <p className="text-sm font-semibold">
                                            Loging to see profile
                                        </p>
                                    </div>
                                ) : (
                                    <Link href={route("profile.edit")}>
                                        <img
                                            src={image}
                                            alt=""
                                            className="w-15 h-15 m-2 rounded-full drop-shadow-md"
                                        />
                                    </Link>
                                )}

                                <ul className="flex flex-col">
                                    <li className="border-b border-my_gray p-2">
                                        <Link
                                            className="text-my_white"
                                            href={route("welcome")}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li className="border-b border-my_gray p-2">
                                        <Link
                                            className="text-my_white"
                                            href={route("welcome")}
                                        >
                                            Movies
                                        </Link>
                                    </li>
                                    <li className="border-b border-my_gray p-2">
                                        <Link
                                            className="text-my_white"
                                            href="#"
                                        >
                                            TV Shows
                                        </Link>
                                    </li>
                                    {!auth.user ? (
                                        <>
                                            <li className="bg-my_red p-2 border-b border-my_gray2">
                                                <Link
                                                    className="text-my_white"
                                                    href={route("login")}
                                                >
                                                    Log in
                                                </Link>
                                            </li>
                                            <li className="border-b bg-my_white border-my_gray p-2">
                                                <Link
                                                    className="text-my_gray2"
                                                    href={route("register")}
                                                >
                                                    Register
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="border-b border-my_gray p-2 bg-my_white">
                                                <Link
                                                    className="text-my_gray2"
                                                    href={route("logout")}
                                                    method="post"
                                                >
                                                    Log out
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </>
                    )}
                </nav>
            </div>
        </>
    );
}

export default nav;
