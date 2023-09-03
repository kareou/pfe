import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Favorite from "@/Components/mycomponents/user/favorite";

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
        <div className="py-8 px-16 text-my_gray2">
            <h1>Profile</h1>
            <h1>About You</h1>
            <div className="flex justify-between p-4">
                <div className="flex gap-4">
                    <div>
                        <img src={imqge} alt="" className="rounded-full" />
                    </div>
                    <div>
                        <p className="ml-4">
                            <span className=" text-xl font-bold">
                                {auth.user.name}{" "}
                            </span>
                            member since {memeberSince[0]}
                        </p>
                        <p className="ml-4">Total ratting : Total visits :</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="bg-my_gray rounded text-my_white px-2 h-10 drop-shadow-md">update Profile</button>
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
    );
}

export default Profile;
