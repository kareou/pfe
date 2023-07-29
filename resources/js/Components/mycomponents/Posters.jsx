import React, {useState,useEffect} from 'react'
import { fetchMoviePosters } from './service'

function Posters({ movie }) {

  return (
        <div className="flex gap-4 scroll-container mt-5" >
                {movie.slice(0,10).map((mv) => (
                        <img key={mv.id}
                            src={`https://image.tmdb.org/t/p/original/${mv.file_path}`}
                            alt=""
                            className="rounded-md w-[500px] h-[300px]"
                        />
                ))}
            </div>
  )
}

export default Posters
