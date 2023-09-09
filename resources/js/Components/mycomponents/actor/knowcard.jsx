import React from 'react'
import {Link} from "@inertiajs/react";

function knowcard( {movie, actor}) {
    const bg = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    return (
        <li className='list-none	'>
        <div
        className=" w-44  grid gap-1 drop-shadow-lg de">
            <Link
            className='w-full h-64'
             href={`/MoviePage/${movie.id}`}
            >
                <img className="rounded-md drop-shadow-md w-full h-full" src={bg} alt={movie.title} />
            </Link>
            <Link
             href={`/MoviePage/${movie.id}`}
            className=' lg:text-base text-sm text-center hover:text-my_red'>
                {movie.title}
            </Link>
        </div>
        </li>
    );
}

export default knowcard
