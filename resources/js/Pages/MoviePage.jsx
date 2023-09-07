import React from "react";
import { MdOutlineFavorite } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";
import { TiThList } from "react-icons/ti";
import CircularProgress from "@mui/material/CircularProgress";
import Cast from "../Components/mycomponents/cast";
import Media from "../Components/mycomponents/media";
import Recomandation from "../Components/mycomponents/recomandation";
import { useState, useEffect } from "react";
import {
    fetchMovieDetails,
    fetchMovieVideos,
} from "../Components/mycomponents/service";
import { usePage } from "@inertiajs/react";
import Nav from "../Components/mycomponents/nav";
import { useForm } from "@inertiajs/react";

function MoviePqge(props, { auth }) {
    const [movie, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { fav, setfav, post, processing } = useForm({
        movie_id: props.movie,
    });

    const id = props.movie;
    useEffect(() => {
        fetchMovieDetails(id)
            .then(setMovies)
            .finally(() => setIsLoading(false));
    }, [id]);

    function convertRuntime(runtime) {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}min`;
    }

    function getBackdrop(path) {
        return `https://image.tmdb.org/t/p/original/${path}`;
    }

    const [infav, setinfav] = useState(false);
    const [inwatchlist, setinwatchlist] = useState(false);
    const [inwatched, setinwatched] = useState(false);

    const page = usePage();

    useEffect(() => {
        if (
            page.props.auth.user &&
            page.props.auth.user.favorite.includes(props.movie)
        ) {
            setinfav(true);
        }

        if (
            page.props.auth.user &&
            page.props.auth.user.watchlist.includes(props.movie)
        ) {
            setinwatchlist(true);
        }

        if (
            page.props.auth.user &&
            page.props.auth.user.watched.includes(props.movie)
        ) {
            setinwatched(true);
        }
    }, [page.props.auth.user]);

    const fcolor = infav ? "#D3D6DB" : "#303841";
    const wcolor = inwatchlist ? "#D3D6DB" : "#303841";
    const wacolor = inwatched ? "#D3D6DB" : "#303841";

    function changeColor(progress) {
        if (progress < 40) {
            return "#BE3144";
        } else if (progress < 70) {
            return "#D2D531";
        } else {
            return "#21D07A";
        }
    }

    function submit(e) {
        e.preventDefault();
        post("/favorite");
    }

    function submit2(e) {
        e.preventDefault();
        post("/watchlist");
    }

    function submit3(e) {
        e.preventDefault();
        post("/watched");
    }

    return (
        <>
            {!isLoading && (
                <div className="pt-4 z-0">
                    <Nav auth={page.props.auth} />
                    <div className=" mt-10">
                        <div
                            className=" w-full h-max p-8  text-my_white "
                            style={{
                                backgroundImage: `linear-gradient(to top,rgba(48, 56, 65, 0.75) 10% ,rgba(48, 56, 65, 0.75) ), url(${getBackdrop(
                                    movie.backdrop_path
                                )})`,
                                backgroundSize: "cover",
                            }}
                        >
                            <div className="md:flex gap-8 grid">
                                <div
                                    className="h-full "
                                    style={{
                                        boxSizing: "border-box",
                                        display: "block",
                                        minWidth: "300px",
                                        height: "450px",
                                        width: "300px",
                                    }}
                                >
                                    <img
                                        className="rounded drop-shadow-lg mx-6"
                                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                        alt=""
                                        style={{}}
                                        srcSet=""
                                    />
                                </div>
                                <div className="absolute rounded-full md:right-20 right-28  ">
                                    <h1 className=" absolute m-3 font-bold text-white text-md">
                                        {Math.round(movie.vote_average * 10)}
                                    </h1>
                                    <CircularProgress
                                        variant="determinate"
                                        value={Math.round(
                                            movie.vote_average * 10
                                        )}
                                        size={45}
                                        sx={{
                                            color: changeColor(
                                                Math.round(
                                                    movie.vote_average * 10
                                                )
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="pt-8 grid gap-4 relative">
                                    <div>
                                        <h1 className="font-bold text-2xl">
                                            {movie.title}
                                        </h1>
                                        <h3 className="md:flex gap-2 font-thin text-sm">
                                            <li>{movie.release_date}</li>
                                            <li>
                                                {convertRuntime(movie.runtime)}
                                            </li>
                                            {movie.genres.map((genre) => (
                                                <li key={genre.id}>
                                                    {genre.name}
                                                </li>
                                            ))}
                                        </h3>
                                    </div>
                                    <div>
                                        <h3 className=" tag text-lg opacity-70 italic">
                                            {movie.tagline}
                                        </h3>
                                        <h1 className="mt-[10px] text-lg font-semibold underline">
                                            Overview
                                        </h1>
                                        <p className=" text-justify text-sm font-semibold">
                                            {movie.overview}
                                        </p>
                                    </div>
                                    <div className="flex gap-8 text-lg">
                                        <form onSubmit={submit}>
                                            <button className="flex justify-center items-center  rounded-full bg-my_red w-12 h-12 shadow">
                                                <MdOutlineFavorite
                                                    style={{ color: fcolor }}
                                                />
                                            </button>
                                        </form>
                                        <form onSubmit={submit2}>
                                            <button className="flex justify-center items-center  rounded-full bg-my_red w-12 h-12 shadow">
                                                <BsFillBookmarkFill
                                                    style={{ color: wcolor }}
                                                />
                                            </button>
                                        </form>
                                        <form onSubmit={submit3}>
                                            <button className="flex justify-center items-center  rounded-full bg-my_red w-12 h-12 shadow">
                                                <TiThList
                                                    style={{ color: wacolor }}
                                                />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:p-8 p-4 grid gap-8">
                            <Cast movie={movie} type="movie" />
                            <Media movie={movie} type="movie" />
                            <Recomandation movie={movie} type="movie" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MoviePqge;
