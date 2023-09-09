import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Favorite from "@/Components/mycomponents/user/favorite";
import {BsFillGearFill} from "react-icons/bs";
import Nav from "@/Components/mycomponents/Nav";

function Profile() {
    const { auth } = usePage().props;

    if (auth.user.image === null) {
        var imqge =
            "https://ui-avatars.com/api/?name=" +
            auth.user.name +
            "background=random";
    } else {
        if (auth.user.image.includes("https://")) {
            var imqge = auth.user.image;
        } else {
            var tmp = auth.user.image.split("/");
            var imqge = "/storage/" + tmp[1];
        }
    }

    const memeberSince = auth.user.created_at.split("T");

    const [index, setindex] = useState(0);

    return (
        <div className="pt-4 z-0 container mx-auto bg-my_white">
            <Nav auth={auth} />
            <div className="z-0 mt-10">

            <div className="grid justify-items-center  p-4 bg-my_gray2 text-my_white ">
                <div className="grid gap-4">
                    <div>
                        <img src={imqge} alt="" className="w-full h-max rounded-lg drop-shadow-lg" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className=" text-lg">
                            <span className=" font-bold text-xl">
                                {auth.user.name}{" "}
                            </span>
                            member since {memeberSince[0]}
                        </p>
                        <p className=" text-lg">Total ratting : Total visits :</p>
                    </div>
                </div>
                <div className="grid justify-items-end w-full">
                    <button className="text-my_white px-2 h-10 drop-shadow-md">
                        <BsFillGearFill className="text-3xl" />
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-1 mt-5 px-4">
                <div className="w-[5px] h-[30px] bg-my_red"></div>
                <h1 className=" text-my_gray2 text-lg font-bold">Lists</h1>
            </div>
            <div className="flex justify-center gap-8 text-lg">
                <button
                    onClick={() => setindex(0)}
                    className=" underline decoration-my_red opacity-50 focus:opacity-100"
                >
                    favorite
                </button>
                <button
                    onClick={() => setindex(1)}
                    className=" underline decoration-my_red opacity-50 focus:opacity-100"
                >
                    watchlist
                </button>
                <button
                    onClick={() => setindex(2)}
                    className=" underline decoration-my_red opacity-50 focus:opacity-100"
                >
                    watched
                </button>
            </div>
            {index === 0 && <Favorite movies={auth.user.favorite} />}
            {index === 1 && <Favorite movies={auth.user.watchlist} />}
            {index === 2 && <Favorite movies={auth.user.watched} />}
            </div>

        </div>
    );
}

export default Profile;
