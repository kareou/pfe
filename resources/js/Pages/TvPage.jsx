import React from "react";
import { MdOutlineFavorite } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";
import { TiThList } from "react-icons/ti";
import CircularProgress from "@mui/material/CircularProgress";
import Cast from "../Components/mycomponents/cast";
import Media from "../Components/mycomponents/media";
import Recomandation from "../Components/mycomponents/recomandation";
import { useState, useEffect } from "react";
import { fetchTv, fetchTvSeason } from "../Components/mycomponents/service";
import { usePage } from "@inertiajs/react";
import Nav from "../Components/mycomponents/nav";
import { useForm } from "@inertiajs/react";
import { AiFillStar } from "react-icons/ai";
import Rating from "@mui/material/Rating";
import Footer from "../Components/mycomponents/footer";

function MoviePqge(props, { auth }) {
    const [movie, setMovies] = useState([]);
    const [episodes, setepisodes] = useState([]);
    const [season, setseason] = useState(1);

    const [isLoading, setIsLoading] = useState(true);

    const { fav, setfav, post, processing } = useForm({
        movie_id: props.movie + ":t",
    });

    const id = props.movie;
    useEffect(() => {
        fetchTv(id)
            .then(setMovies)
            .finally(() => setIsLoading(false));
        fetchTvSeason(id, season).then(setepisodes);
    }, [id, season]);

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

    if (page.props.auth.user) {
        useEffect(() => {
            if (
                page.props.auth.user.favorite &&
                page.props.auth.user.favorite.includes(props.movie+":"+"t")
            ) {
                setinfav(true);
            }

            if (
                page.props.auth.user.watchlist &&
                page.props.auth.user.watchlist.includes(props.movie+":"+"t")
            ) {
                setinwatchlist(true);
            }

            if (
                page.props.auth.user.watched &&
                page.props.auth.user.watched.includes(props.movie+":"+"t")
            ) {
                setinwatched(true);
            }
        }, [page.props.auth.user]);
    }
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
        if (!page.props.auth.user) return;
        post("/favorite");
        location.reload();

    }

    function submit2(e) {
        e.preventDefault();
        if (!page.props.auth.user) return;
        post("/watchlist");
        location.reload();

    }

    function submit3(e) {
        e.preventDefault();
        if (!page.props.auth.user) return;
        post("/watched");
        location.reload();

    }

    const time = (min) => {
        return Math.floor(min / 60) + "h" + (min % 60) + "min";
    };

    function submitrating(e) {
        e.preventDefault();
        post("/rating");
    }

    return (
        <>
            {!isLoading && (
                <div className="pt-4 z-0 container mx-auto flex flex-col justify-between">
                    <Nav auth={page.props.auth} />
                    <div className=" my-10">
                        <div
                            className=" w-full h-max p-8  text-my_white relative"
                            style={{
                                backgroundImage: `linear-gradient(to top,rgba(48, 56, 65, 0.75) 10% ,rgba(48, 56, 65, 0.75) ), url(${getBackdrop(
                                    movie.backdrop_path
                                )})`,
                                backgroundSize: "cover",
                            }}
                        >
                            <div className="md:flex gap-20 grid">
                                <div
                                    className="h-full"
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
                                            {movie.name}
                                        </h1>
                                        <h3 className="md:flex gap-2 font-thin text-sm">
                                            <li>
                                                <span className=" font-bold">
                                                    first air date :{" "}
                                                </span>
                                                {movie.first_air_date}
                                            </li>
                                            <li>
                                                <span className=" font-bold">
                                                    last air date :{" "}
                                                </span>
                                                {movie.last_air_date}
                                            </li>
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
                                            <button
                                                disabled={!page.props.auth.user}
                                                className="flex justify-center items-center  rounded-full bg-my_red w-12 h-12 shadow"
                                            >
                                                <MdOutlineFavorite
                                                    style={{ color: fcolor }}
                                                />
                                            </button>
                                        </form>
                                        <form onSubmit={submit2}>
                                            <button
                                                disabled={!page.props.auth.user}
                                                className="flex justify-center items-center  rounded-full bg-my_red w-12 h-12 shadow"
                                            >
                                                <BsFillBookmarkFill
                                                    style={{ color: wcolor }}
                                                />
                                            </button>
                                        </form>
                                        <form onSubmit={submit3}>
                                            <button
                                                disabled={!page.props.auth.user}
                                                className="flex justify-center items-center  rounded-full bg-my_red w-12 h-12 shadow"
                                            >
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
                            <Cast movie={movie} type={"tv"} />
                            <div className="grid gap-4">
                                <div className="flex items-center gap-1">
                                    <div className="w-[5px] h-[40px] bg-my_red"></div>
                                    <h1 className=" text-my_gray2 text-xl font-bold">
                                        Seasons
                                    </h1>
                                    <select
                                        name=""
                                        id=""
                                        onChange={(e) =>
                                            setseason(e.target.value)
                                        }
                                        className="border-none rounded focus:ring-my_red ml-4 h-10"
                                    >
                                        {movie.seasons
                                            .filter(
                                                (season) =>
                                                    season.season_number !== 0
                                            )
                                            .map((season) => (
                                                <option
                                                    key={season.id}
                                                    value={season.season_number}
                                                >
                                                    S{season.season_number}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="grid gap-4 w-full">
                                    {episodes.map((episode) => (
                                        <div
                                            key={episode.episode_number}
                                            className="md:flex grid  gap-8 rounded w-full text-sm shadow-lg border border-my_gray2/25"
                                        >
                                            <img
                                                className="md:rounded-l md:h-32 md:w-max w-full h-max rounded-t"
                                                src={`https://image.tmdb.org/t/p/original/${episode.still_path}`}
                                                alt=""
                                                style={{}}
                                                srcSet=""
                                            />
                                            <div className="grid md:gap-0 gap-4 md:p-0 p-4">
                                                <h1 className="text-2xl py-2 font-bold">
                                                    {episode.episode_number}{" "}
                                                    {episode.name}
                                                </h1>
                                                <div className="flex gap-4">
                                                    <div className="bg-my_gray rounded-lg text-lg px-1 gap-1 flex w-min h-min text-my_white">
                                                        <span>
                                                            <AiFillStar className="text-my_red m-1" />
                                                        </span>
                                                        {episode.vote_average.toFixed(
                                                            1
                                                        )}
                                                    </div>
                                                    <span className=" text-base">
                                                        {episode.air_date}
                                                    </span>
                                                    <span className=" decoration-clone text-base">
                                                        {time(episode.runtime)}
                                                    </span>
                                                </div>
                                                <h1 className=" font-semibold text-xl">
                                                    {episode.overview}{" "}
                                                </h1>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <tr className="border border-my_red/75"></tr>
                            <Media movie={movie} type={"tv"} />
                            <Recomandation movie={movie} type={"tv"} />
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
}

export default MoviePqge;
