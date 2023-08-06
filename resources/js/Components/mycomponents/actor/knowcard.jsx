import React from 'react'
import {Link} from "@inertiajs/react";

function knowcard( {movie, actor}) {
    const progress  = Math.round( movie.vote_average * 10);
    const bg = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    return (
        <div className=" w-32 grid gap-1 drop-shadow-lg">
            <Link
             href={`/MoviePage/${movie.id}`}
            >
                <img className="rounded-md drop-shadow-md" src={bg} alt={movie.title} />
            </Link>
            <Link
             href={`/MoviePage/${movie.id}`}
            className=' text-sm text-center hover:text-my_red'>
                {movie.title}
            </Link>
        </div>
    );
}

export default knowcard
