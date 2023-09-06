import React, { useState, useEffect } from "react";
import { fetchMovieRecomandations, fetchTvRecomandations } from "./service";

function recomandation({ movie, type }) {
    const [recomandation, setRecomandation] = useState([]);

    if(type === "movie"){
    useEffect(() => {
        fetchMovieRecomandations(movie.id).then(setRecomandation);
    }, [movie.id]);
    }else{
        useEffect(() => {
            fetchTvRecomandations(movie.id).then(setRecomandation);
        }, [movie.id]);
    }


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
                <div key={recomand.id} className="w-[250px] h-[250px] shadow-lg rounded-md overflow-hidden bg-white">
                <img
                  src={`https://image.tmdb.org/t/p/w400/${recomand.poster_path}`}
                  alt="recomand"
                  className="w-full h-[125px] object-cover"
                />
                <div className="p-4">
                  <h1 className="text-my_gray2 font-bold truncate">
                    {recomand.title}
                  </h1>
                  <p className="text-my_gray2 font-bold mt-2">
                    {Math.round(recomand.vote_average * 10)} / 100
                  </p>
                </div>

              </div>

            ))}
        </div>
        </div>
    );
}

export default recomandation;
