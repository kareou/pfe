import React, { useState, useEffect } from "react";
import { fetchMovieBackdrops } from "./service";

function Backdrops({ movie }) {
    return (
        <div className="">
            <div className="flex gap-4 scroll-container mt-5">
                {movie.slice(0, 10).map((mv) => (
                    <img
                        src={`https://image.tmdb.org/t/p/original/${mv.file_path}`}
                        alt=""
                        className="rounded-md w-[500px] h-[300px]"
                    />
                ))}
            </div>
        </div>
    );
}

export default Backdrops;
