import React from "react";
import { useState, useEffect } from "react";
import { fetchMovieDetails, fetchTv } from "../service";
import Card from "../card";
import { AiOutlineEye } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { AiFillStar } from "react-icons/ai";
import { Link } from "@inertiajs/react";



function favorite(movies) {
    const fav = movies.movies;
    const [movie, setMovie] = useState([]);

    if (fav) {
        useEffect(() => {
            fav.map((fav) => {
                var tmp = fav.split(":");
                if (tmp[1] === "movie") {
                    fetchMovieDetails(tmp[0]).then((response) => {
                        setMovie((movie) => [...movie, response]);
                    });
                }
                else {
                    fetchTv(tmp[0]).then((response) => {
                    setMovie((movie) => [...movie, response]);
                });
                }
            });
        }, [fav]);
    }

    const getroute = (id) => {
        let test = fav.find((f) => {
            const tmp = f.split(":");
            return parseInt(tmp[0]) === parseInt(id);
          });

        if (!test) {
            return;
        }
        const tmp = test.split(":");
        if (tmp[1] === "movie") {
            return "/MoviePage/" + tmp[0];
        } else {
            return "/TvPage/" + tmp[0];
        }
    };

    const gettitle = (id,mov) => {
        let test = fav.find((f) => {
            const tmp = f.split(":");
            return parseInt(tmp[0]) === parseInt(id);
          });
        if (!test) {
            return;
        }
        const tmp = test.split(":");
        if (tmp[1] === "movie") {
            return mov.title;
        } else {
            return mov.name;
        }
    };

    const getdate = (id,mov) => {
        let test = fav.find((f) => {
            const tmp = f.split(":");
            return parseInt(tmp[0]) === parseInt(id);
          });
        if (!test) {
            return;
        }
        const tmp = test.split(":");
        if (tmp[1] === "movie") {
            return mov.release_date;
        } else {
            return mov.first_air_date;
        }
    };


    return (
        <div className=" mt-5 text-my_gray2">
            <div className="flex flex-wrap gap-4">
                {movie.map((movie) => (
                    <div className="flex gap-4 bg-white rounded drop-shadow-md  md:h-max md:w-72 w-full overflow-hidden">
                        <img
                            className=" h-full w-1/2 rounded-l"
                            src={
                                "https://image.tmdb.org/t/p/w500/" +
                                movie.poster_path
                            }
                            alt=""
                        />
                        <div className=" px-2 py-4 flex flex-col justify-between w-full">
                            <div className="grid gap-4">
                                <h1 className="text-lg font-bold truncate">{gettitle(movie.id,movie)}</h1>
                                <h1 className="text-lg underline">
                                    {getdate(movie.id,movie)}
                                </h1>
                                <div className="bg-my_gray rounded-lg text-lg px-1 gap-1 flex w-min h-min text-my_white">
                                    <span>
                                        <AiFillStar className="text-my_red m-1" />
                                    </span>
                                    {movie.vote_average.toFixed(1)}
                                </div>
                            </div>
                            <div className="grid justify-items-end gap-4 md:flex md:mt-4">
                                <div
                                    className=" bg-my_gray2 w-max h-max rounded-md text-white"
                                    title="view movie"
                                >
                                    <Link href={getroute(movie.id)}>
                                    <AiOutlineEye className="text-2xl m-2" />
                                    </Link>
                                </div>
                                <form action="">
                                    <button
                                        className=" bg-my_red text-white w-max h-max rounded-md"
                                        title="remove from favorite"
                                    >
                                        <ImBin className="text-2xl m-2"/>
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
