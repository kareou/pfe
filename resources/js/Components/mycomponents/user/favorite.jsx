import React from "react";
import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../service";
import Card from "../card";
import { AiOutlineEye } from "react-icons/ai";
import { ImBin } from "react-icons/im";

function favorite(movies) {
    const fav = movies.movies;
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fav.map((fav) => {
            fetchMovieDetails(fav).then((response) => {
                setMovie((movie) => [...movie, response]);
            });
        });
    }, [fav]);

    return (
        <div className=" mt-5 text-my_gray2">
            <div className="grid grid-cols-4 gap-4">
                {/* {" "} */}
                {movie.map((movie) => (
                    <div className="flex gap-4 bg-white rounded drop-shadow-md">
                        <img
                            className=" h-48 rounded-l"
                            src={
                                "https://image.tmdb.org/t/p/w500/" +
                                movie.poster_path
                            }
                            alt=""
                        />
                        <div className=" px-2 py-4 flex flex-col justify-between w-full">
                            <h1 className=" text-center text-sm">
                                {movie.title}
                            </h1>
                            <div className=" grid justify-items-end gap-4">
                                <div
                                    className=" bg-my_gray2 p-2 rounded-md text-white"
                                    title="view movie"
                                >
                                    <AiOutlineEye />
                                </div>
                                <form action="">
                                    <button
                                        className=" bg-my_red text-white p-2 rounded-md"
                                        title="remove from favorite"
                                    >
                                        <ImBin />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default favorite;
