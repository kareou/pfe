import React, { useState, useEffect } from "react";
import { fetchMovieRecomandations, fetchTvRecomandations } from "./service";
import { Link } from "@inertiajs/react";
import { AiFillStar } from "react-icons/ai";


function recomandation({ movie, type }) {
    const [recomandation, setRecomandation] = useState([]);


    console.log(movie)
    if (type === "movie") {
        useEffect(() => {
            fetchMovieRecomandations(movie.id).then(setRecomandation);
        }, [movie.id]);
    } else {
        useEffect(() => {
            fetchTvRecomandations(movie.id).then(setRecomandation);
        }, [movie.id]);
    }
    const start = Math.random() * 10;

    const images = (path) => {
        if (path) {
            return `https://image.tmdb.org/t/p/w400/${path}`;
        } else {
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019";
        }
    }

    return (
        <div className="grid gap-4">
            <div className="flex items-center gap-1">
                <div className="w-[5px] h-[40px] bg-my_red"></div>
                <h1 className=" text-my_gray2 text-xl font-bold">
                    Recomandation
                </h1>
            </div>
            <div className="flex flex-wrap gap-4 justify-center h-max">
                {recomandation.slice(start, 7 + start).map((recomand) => (
                    <div
                        key={recomand.id}
                        className="w-[250px] h-max shadow-lg rounded-md overflow-hidden bg-white"
                    >
                        <img
                            src={images(recomand.poster_path)}
                            alt="recomand"
                            className="w-full h-80 object-cover"
                        />
                        <div className="p-4">
                            <Link
                                href={
                                    type === "movie"
                                        ? `/MoviePage/${recomand.id}`
                                        : `/TvPage/${recomand.id}`
                                }
                                className="hover:underline"
                            >
                                <h1 className="text-my_gray2 font-bold truncate text-lg">
                                    {type === "movie" ? recomand.title : recomand.name}
                                </h1>
                            </Link>
                            <p className="text-my_gray2  mt-2">
                                <div className="bg-my_gray rounded-lg px-1 gap-1 flex w-min h-min text-my_white">
                                    <span>
                                        <AiFillStar className="text-my_red m-1" />
                                    </span>
                                    {recomand.vote_average.toFixed(1)}
                                </div>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default recomandation;
