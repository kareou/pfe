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

function card({ movie }) {

    const [win, setWin] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      useEffect(() => {
        const handleResize = () => {
          setWin({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [win, screen.width]);


    const progress = Math.round(movie.vote_average * 10);
    const bg = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    return (
        <div className="relative w-32 lg:w-44 grid gap-3 drop-shadow-lg">
            <Link href={`/MoviePage/${movie.id}`}>
                <img className="rounded" src={bg} alt={movie.title} />
            </Link>
            <div className=" relative rounded-full -mt-8 ml-1 lg:-mt-12">
                <img className="absolute h-[1.7rem] lg:h-12" src={im} alt="" />
                <h1 className="absolute pt-2 pl-[.4rem] font-bold text-white text-xxs lg:text-base">
                    {progress}%
                </h1>
                {win.width > 1024 && (
                    <CircularProgress
                    shr
                    variant="determinate"
                    size={50}
                    value={progress}
                    sx={{ color: changeColor(progress) }}
                    />
                    )}
                {win.width <= 1024 && (
                    <CircularProgress
                    shr
                    variant="determinate"
                    size={30}
                    value={progress}
                    sx={{ color: changeColor(progress) }}
                    />
                    )}

            </div>
            <div className="font-bold text-[#3A4750] -mt-3 ml-1">
                <h2 className=" text-my_gray2 text-sm font-extrabold hover:text-my_red lg:text-lg">
                    {movie.title}
                </h2>
                <p className=" text-my_gray2 -mt-1 text-xs lg:text-base">
                    {movie.release_date}
                </p>
            </div>
        </div>
    );
}

export default card;
