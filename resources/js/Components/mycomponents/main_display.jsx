import React from "react";
import { fetchMovieVideos, fetchMovies, fetchMovieDetails } from "./service";
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { AiOutlinePlayCircle } from "react-icons/ai";
import prev from "../../../../../../Downloads/Group 60.svg";
import next from "../../../../../../Downloads/Group 61.svg";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { Link } from "@inertiajs/react";

function main_display() {
    const [search, setSearch] = useState("");
    const [play, setPlay] = useState(false);
    const [ready, setReady] = useState(false);
    const [all, setAll] = useState([]);
    const [reset, setReset] = useState(false);
    const handelred = () => {
        setReady(true);
    };
    useEffect(() => {
        fetchMovies("/trending/movie/day").then(setAll);
    }, []);
    function getBg(path) {
        return `https://image.tmdb.org/t/p/w500/${path}`;
    }
    function getBackdrop(path) {
        return `https://image.tmdb.org/t/p/original/${path}`;
    }
    const [i, setI] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (play || !all.length) return;

            setI((i) => (i + 1) % all.length);
        }, 5000);
        return () => clearInterval(intervalId);
    }, [all.length, play, i]);

    const getTraillers = async (id) => {
        let movies;
        await fetchMovieVideos(`/movie/${id}/videos`).then((data) => {
            movies = data;
        });
        const filtered = movies.filter(
            (movie) =>
                movie.type === "Trailer" &&
                (movie.name === "Main Trailer" ||
                    movie.name === "Official Trailer")
        );
        return filtered[0]?.key;
    };

    const gettags = async (id) => {
        let movies;
        await fetchMovieDetails(id).then((data) => {
            movies = data;
        });
        return movies;
    };

    const sideretag = async (id) => {
        let tag;
        tag = await gettags(id);
        return tag.tagline;
    };

    let [videoId, setVideoId] = useState(null);

    useEffect(() => {
        const fetchVideoId = async () => {
            try {
                const id = await getTraillers(all[i]?.id);
                setVideoId(id);
            } catch (error) {
                console.error("Error fetching video ID:", error);
            }
        };
        fetchVideoId();
    }, [all[i]?.id]);

    let [tags, setTags] = useState(null);

    useEffect(() => {
        const fetchVideoId = async () => {
            try {
                const id = await gettags(all[i]?.id);
                setTags(id.tagline);
            } catch (error) {
                console.error("Error fetching video ID:", error);
            }
        };
        fetchVideoId(

        );
    }, [all[i]?.id]);


    return (
        <div className="md:flex gap-8 mt-10 container">
            <div className="vid md:w-[850px] md:h-[548px] h-[300px] w-screen relative drop-shadow-lg">
                {play && (
                    <>
                        {!ready && (
                            <Skeleton
                                variant="rectangular"
                                width={850}
                                height={548}
                                sx={{
                                    bgcolor: "#303841",
                                    boxShadow: 8,
                                    position: "absolute",
                                }}
                            />
                        )}
                        <YouTube
                            videoId={videoId}
                            opts={{
                                width: "100%", // Set the width to 100% to make it responsive
                                height: "100%",
                                position: "absolute",
                                playerVars: { autoplay: 1 },
                            }}
                            onReady={handelred}
                        />
                        {ready && (
                            <div className="absolute top-5 right-5">
                                <h1
                                    className="text-2xl text-my_white font-bold cursor-pointer"
                                    onClick={() => setPlay(false)}
                                >
                                    X
                                </h1>
                            </div>
                        )}
                    </>
                )}

                {!play && (
                    <>
                        <div
                            className="rounded w-full h-full absolute"
                            style={{
                                backgroundImage: `linear-gradient(to top,rgba(0, 0, 0, 1) 10% ,rgba(48, 56, 65, 0.3) ), url(${getBackdrop(
                                    all[i]?.backdrop_path
                                )})`,
                                backgroundSize: "cover",
                            }}
                        ></div>

                        <img
                            className="p-[20px 12px] absolute left-5 md:h-16 h-10 top-20 md:top-56 cursor-pointer"
                            onClick={() =>
                                setI(
                                    (prevI) =>
                                        (prevI - 1 + all.length) % all.length
                                )
                            }
                            src={next}
                            alt=""
                        />
                        <img
                            className="p-[20px 12px] absolute right-5 md:h-16 h-10 top-20 md:top-56 cursor-pointer"
                            onClick={() =>
                                setI((prevI) => (prevI + 1) % all.length)
                            }
                            src={prev}
                            alt=""
                        />
                        <div className="absolute md:mx-12 mx-2 bottom-5 flex gap-4 z-40">
                            <Link href={`/MoviePage/${all[i]?.id}`}>
                                <img
                                    className=" md:w-[165px]  md:h-[244px] h-[160px] shadow rounded"
                                    src={getBg(all[i]?.poster_path)}
                                    alt=""
                                />
                            </Link>
                            <div className=" text-my_white font-bold">
                                <h1 className=" md:text-2xl text-lg">{all[i]?.title}</h1>
                                <h2 className=" text-sm font-thin block md:hidden">
                                    {tags && tags.length > 30 ? tags.slice(0, 30) + "..." : tags}
                                </h2>
                                <h2 className=" text-sm font-thin hidden md:block">
                                    {tags}
                                </h2>
                            </div>
                        </div>
                        <div className="bottom-2 md:right-5 right-2 absolute flex items-center gap-2">
                            <h1 className="md:text-2xl text-sm text-my_white font-bold">
                                Play Trailer
                            </h1>
                            <AiOutlinePlayCircle
                                className="md:w-[100px] w-16 h-[100px]  text-my_white/20 shadow cursor-pointer "
                                onClick={() => setPlay(true)}
                            />
                        </div>
                    </>
                )}
            </div>
            <div className="wait  drop-shadow-lg hidden  md:block">
                <h5 className="font-bold text-xl text-my_gray2 underline">
                    Next
                </h5>
                <div className="h-[510px] w-[400px] bg-my_gray rounded p-4 grid gap-4">
                    {all &&
                        all.slice(i + 1, 3 + i + 1).map((al, i) => (
                            <div
                                key={i}
                                className="flex gap-2 h-[130px] w-[80]"
                            >
                                <Link href={`/MoviePage/${al.id}`}>
                                    <img
                                        className="h-full rounded shadow-md"
                                        src={getBg(al.poster_path)}
                                        alt=""
                                    />
                                </Link>
                                <div className=" text-my_white font-bold">
                                    <h1 className=" text-lg">{al.title}</h1>
                                    <h2 className=" text-sm font-thin">
                                        {al.release_date}
                                    </h2>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default main_display;
