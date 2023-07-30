import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import im from "../../../../../../Downloads/Ellipse 10.svg";
import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";

function changeColor(progress) {
    if (progress < 40) {
        return "#BE3144";
    } else if (progress < 70) {
        return "#D2D531";
    } else {
        return "#21D07A";
    }
}

function card( {movie}) {
    const progress  = Math.round( movie.vote_average * 10);
    const bg = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    return (
        <div className="relative w-32 grid gap-3 drop-shadow-lg">
            <Link
             href={`/MoviePage/${movie.id}`}
            >
                <img className="rounded" src={bg} alt={movie.title} />
            </Link>
            <div className=" relative rounded-full -mt-8 ml-1">
                <img className="absolute h-[1.7rem]" src={im} alt="" />
                <h1 className="absolute pt-2 pl-[.4rem] font-bold text-white text-xxs">
                    {progress}%
                </h1>
                <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={29}
                    sx={{ color: changeColor(progress) }}
                />
            </div>
            <div className="font-bold text-[#3A4750] -mt-3 ml-1">
                <h2 className=" text-my_gray2 text-sm font-extrabold hover:text-my_red">{movie.title}</h2 >
                <p className=" text-my_gray2 -mt-1 text-xs">{movie.release_date}</p>
            </div>
        </div>
    );
}

export default card;
