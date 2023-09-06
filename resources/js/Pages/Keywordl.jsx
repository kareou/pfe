import React from "react";
import {
    fetchMovieByKeyword,
    fetchTvbykeyword,
} from "../Components/mycomponents/service.jsx";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Nav from "../Components/mycomponents/nav";

function Keywordll(props) {
    const page = usePage();

    const [keyword, setKeyword] = React.useState([]);
    const [indexp, setPage] = React.useState(1);
    const [sort, setSort] = React.useState("popularity.desc");

    if (props.type === "movie") {
        React.useEffect(() => {
            fetchMovieByKeyword(props.keyword, indexp).then(setKeyword);
        }, [props.keyword, indexp, sort]);
    } else {
        React.useEffect(() => {
            fetchTvbykeyword(props.keyword, indexp, sort).then(setKeyword);
        }, [props.keyword, indexp, sort]);
    }

    console.log(keyword);

    const handelnext = () => {
        setPage(indexp + 1);
    };

    const handelprev = () => {
        if (indexp <= 1) return;
        setPage(indexp - 1);
    };

    return (
        <div className="container mx-auto pt-4">
            <Nav auth={page.props.auth} />

            <div className=" mt-10 flex">
                <div className="w-full">
                    <h1 className="text-xl font-bold">filer by</h1>
                    <div className="grid gap-2">
                        <div>
                            <input
                                type="checkbox"
                                value="popularity.desc"
                                onChange={(e) => setSort(e.target.value)}
                            />
                            <label>popularity</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                value="vote_average.desc"
                                onChange={(e) => setSort(e.target.value)}
                            />
                            <label>vote_average</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                value="first_air_date.desc"
                                onChange={(e) => setSort(e.target.value)}
                            />
                            <label>first_air_date</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                value="release_date.desc"
                                onChange={(e) => setSort(e.target.value)}
                            />
                            <label>release_date</label>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-wrap justify-center">
                        {keyword.map((movie) => (
                            <Link
                                href={`/MoviePage/${movie.id}`}
                                className="w-1/5 m-2"
                                key={movie.id}
                            >
                                <div className="relative">
                                    <img
                                        className="rounded-lg shadow-lg h-80 w-full object-cover"
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    />
                                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-full flex justify-center items-center gap-2 text-white text-lg font-semibold">
                                        <h1>{movie.title}</h1>
                                        <h1>{movie.release_date}</h1>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handelprev}
                            className="bg-my_gray text-my_white p-2 rounded m-2"
                        >
                            Prev
                        </button>
                        <button
                            onClick={handelnext}
                            className="bg-my_gray text-my_white p-2 rounded m-2"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Keywordll;
