import React, { useState, useEffect } from "react";
import { fetchMovieRecomandations } from "./service";

function recomandation({ movie }) {
    const [recomandation, setRecomandation] = useState([]);

    useEffect(() => {
        fetchMovieRecomandations(movie.id).then(setRecomandation);
    }, [movie.id]);

    // console.log(recomandation);
    const start = Math.random() * 10;

    return (
        <div className="grid gap-4">
            <div className="flex items-center gap-1">
                <div className="w-[5px] h-[40px] bg-my_red"></div>
                <h1 className=" text-my_gray2 text-xl font-bold">Recomandation</h1>
            </div>
        <div className="flex gap-4 scroll-container h-[300px]">
            {recomandation.slice(start,5 + start).map((recomand) => (
                <div key={recomand.id} className="w-[250px] h-[125px]">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${recomand.poster_path}`}
                        alt="recomand"
                        className="w-[250px] h-[125px] rounded-md"
                    />
                    <h1 className=" text-my_gray2 font-bold flex justify-between mt-2">
                        <span>
                        {recomand.title}
                        </span>
                        <span>
                            {Math.round(recomand.vote_average * 10)}
                        </span>
                        </h1>
                </div>
            ))}
        </div>
        </div>
    );
}

export default recomandation;
