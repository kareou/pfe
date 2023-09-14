import React, { useState, useEffect } from "react";
import {
    fetchmoviegend,
    fetchmoviebygenre,
} from "../Components/mycomponents/service.jsx";
import { usePage, Link } from "@inertiajs/react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Nav from "../Components/mycomponents/nav";
import Footer from "@/Components/mycomponents/footer.jsx";


function movies() {
    const [genre, setGener] = useState([]);
    const [movies, setMovies] = useState([]);
    const [type, setType] = useState(28);
    const [start, setStart] = useState(1);
    const [ready, setReady] = useState(false);
    const [g, setG] = useState("Action");

    useEffect(() => {
        fetchmoviegend().then((data) => {
            setGener(data);
        });
    }, []);

    useEffect(() => {
        if (movies.length !== 0) setMovies([]);
        for (let i = 1; i <= 100; i++) {
            fetchmoviebygenre(type, i).then((data) => {
                if (i === 1) setMovies(data);
                else setMovies((movies) => [...movies, ...data]);
            });
            if (i === 100) {
                setReady(true);
            }
        }
    }, [type]);

    const page = usePage();

    const getimage = (path) => {
        if (path) {
            return "https://image.tmdb.org/t/p/w500" + path;
        } else {
            return "https://placehold.co/128x193?text=Image+Not+Found";
        }
    };

    const getonep = (p) => {
        var p = p.split(".");
        var par = [p[0], p[1], p[2]];
        return par
            .filter((element) => element !== undefined && element !== null)
            .join(".");
    };

    return (
        <div className="container mx-auto pt-4 flex flex-col justify-between">
            <Nav auth={page.props.auth} />
            <h1 className="text-2xl font-bold p-4">Genres</h1>
            <div className="flex flex-wrap justify-center border-b border-my_red/50 p-4">
                {genre.map((gen) => (
                    <button
                        className="bg-my_gray text-my_white m-2 p-2 rounded"
                        key={gen.id}
                        onClick={() => {
                            setStart(1);
                            setType(gen.id);
                            setG(gen.name);
                        }}
                    >
                        {gen.name}
                    </button>
                ))}
            </div>
            <div>
                {ready && (
                    <div className="grid   gap-4 justify-center mt-10">
                        <h1 className="text-my_gray2 text-2xl font-bold">
                            {g} Movies
                        </h1>
                        {movies
                            .slice((start - 1) * 20, start * 20)
                            .map((movie) => (
                                <div
                                    className="flex gap-8 box-border shadow-md border border-gray-500/40 rounded-lg m-2"
                                    key={movie.id}
                                >
                                    <img
                                        src={getimage(movie.poster_path)}
                                        alt=""
                                        className=" h-32 rounded-l"
                                    />
                                    <div className=" grid py-4">
                                        <div>
                                            <Link
                                                href={"/MoviePage/" + movie.id}
                                                className="text-my_gray2 text-lg font-bold hover:text-my_red"
                                            >
                                                {movie.title}
                                            </Link>
                                            <h1 className="text-my_gray2/75 text-sm">
                                                {movie.release_date}
                                            </h1>
                                        </div>
                                        <h1 className="text-my_gray2 font-bold text-sm truncate-2-lines">
                                            {getonep(movie.overview)}
                                        </h1>
                                    </div>
                                </div>
                            ))}
                        <Pagination
                            page={start}
                            onChange={(event, value) => setStart(value)}
                            count={movies.length / 20}
                            variant="outlined"
                        />
                    </div>
                )}
                {!ready && (
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-my_red"></div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default movies;
