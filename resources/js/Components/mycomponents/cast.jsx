import React, { useState, useEffect } from "react";
import { fetchMovieCredits } from "./service";
import { BiRightArrowAlt } from "react-icons/bi";

function cast({ movie }) {
    const [cast, setCast] = useState([]);

    useEffect(() => {
        fetchMovieCredits(movie.id).then(setCast);
    }, []);
    return (
        <div className="grid gap-4">
            <div className="flex items-center gap-1">
                <div className="w-[5px] h-[40px] bg-my_red"></div>
                <h1 className=" text-my_gray2 text-xl font-bold">Top Cast</h1>
            </div>
            <div className="flex gap-4  border-b border-b-my_red pb-5">
                {cast.slice(0, 8).map((actor) => (
                    <div
                        key={actor.id}
                        className="flex flex-col bg-white rounded-md shadow-md w-[130px] "
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                            alt=""
                            className="w-[130px] h-[170px] rounded-md  "
                        />
                        <div className=" text-start p-2">
                            <h1 className="text-my_gray2 font-bold">
                                {actor.name}
                            </h1>
                            <h1 className="text-my_gray2 text-sm font-light">
                                {actor.character}
                            </h1>
                        </div>
                    </div>
                ))}
                <h1 className="">
                    <button className="underline flex items-center">
                        See All
                        <BiRightArrowAlt />
                    </button>
                </h1>
            </div>
        </div>
    );
}

export default cast;
