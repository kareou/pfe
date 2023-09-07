import React, { useState, useEffect } from "react";
import { fetchMovieVideos, fetchMovieBackdrops } from "./service";
import { AiFillPlayCircle } from "react-icons/ai";
import YouTube from "react-youtube";

function videos({ movie }) {
    const [videos, setVideos] = useState(false);
    const [name, setName] = useState("");

    function handelplay(video) {
        setVideos(true);
        setName(video);
    }

    function handelclose() {
        setVideos(false);
        setName("");
    }

    return (
        <div className="">
            {videos && (
                <div className="w-full h-[500px]  relative">
                    <button
                        onClick={handelclose}
                        className="absolute top-5 right-5 text-3xl text-white/75 z-50"
                    >
                        X
                    </button>
                    <div className="w-full h-full z-10 bg-black/50 rounded-md">
                        <YouTube
                            videoId={name}
                            opts={{
                                width: "100%",
                                height: "500px",
                                position: "absolute",
                                playerVars: { autoplay: 1 },
                            }}
                        />
                    </div>
                </div>
            )}
            {!videos && (
                <div className="flex gap-4 scroll-container mt-5">
                    {movie.map((mv) => (
                            <img
                                onClick={() => handelplay(mv.key)}
                                src={`https://img.youtube.com/vi/${mv.key}/maxresdefault.jpg`}
                                alt=""
                                className="rounded-md relative  h-[300px] z-10"
                            />
                    ))}
                </div>
            )}
        </div>
    );
}

export default videos;
