import React, {useState,useEffect} from 'react'
import { fetchMovieVideos, fetchMovieBackdrops } from "./service";


function videos({ movie }) {

  return (
    <div>
        <div className="flex gap-4 scroll-container mt-5">
            {movie.slice(0,2).map((mv) => (
                <div key={mv.id} className=" w-[500px] h-[300px]">
                    <img src={`https://img.youtube.com/vi/${mv.key}/maxresdefault.jpg`} alt="" className="rounded-md"/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default videos
