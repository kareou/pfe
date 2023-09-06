import React, {useState,useEffect} from 'react'
import { fetchMovieVideos, fetchMovieBackdrops } from "./service";
import {AiFillPlayCircle} from "react-icons/ai";


function videos({ movie }) {

    const [videos, setVideos] = useState(false);
    const [name, setName] = useState("");

    function handelplay(video){
        setVideos(true);
        setName(video);
    }

    function handelclose(){
        setVideos(false);
        setName("");
    }

  return (
    <div>
        {videos && (
                <div className='w-full h-[500px]  relative'>
                    <button
                        onClick={handelclose}
                        className="absolute top-5 right-5 text-3xl text-white/75 z-50"
                    >
                        X
                    </button>
                <div className="w-full h-full z-10 bg-black/50 rounded-md">
                    <iframe
                     className="w-full h-full"
                     src={`https://www.youtube.com/embed/${name}`}
                     allowFullScreen
                     ></iframe>


                         </div>
                     </div>
               )}
        {!videos && (
        <div className="flex gap-4 scroll-container mt-5">
            {movie.slice(0,2).map((mv) => (
                <div key={mv.id} className=" w-[500px] h-[300px] relative">
                    <img src={`https://img.youtube.com/vi/${mv.key}/maxresdefault.jpg`} alt="" className="rounded-md"/>
                       <button
                        onClick={() => handelplay(mv.key)}
                        className="text-5xl text-white/75 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                       >
                        <AiFillPlayCircle />
                       </button>
                </div>
            ))}

        </div>
        )}
    </div>
  )
}

export default videos
