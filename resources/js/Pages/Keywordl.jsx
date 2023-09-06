import React from "react";
import {
    fetchMovieByKeyword,
    fetchTvbykeyword,
} from "../Components/mycomponents/service.jsx";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Nav from "../Components/mycomponents/nav";
import { get, set } from "lodash";
import test from "../../../public/rrrainbow.svg";
import { Menu } from "@headlessui/react";
import {AiOutlineDown} from "react-icons/ai";

function Keywordll(props) {
    const page = usePage();

    const [keyword, setKeyword] = React.useState([]);
    const [indexp, setPage] = React.useState(1);
    const [sort, setSort] = React.useState("popularity.desc");

    if (props.type === "movie") {
        React.useEffect(() => {
            fetchMovieByKeyword(props.keyword, indexp).then(setKeyword);
        }, [props.keyword, sort]);
    } else {
        React.useEffect(() => {
            fetchTvbykeyword(props.keyword, indexp, sort).then(setKeyword);
        }, [props.keyword, sort]);
    }

    const loadmore = () => {
        const newIndexp = indexp + 1;
        setPage(newIndexp);
        if (props.type === "movie") {
            fetchMovieByKeyword(props.keyword, newIndexp, sort).then((res) => {
                res === undefined
                    ? setPage(indexp)
                    : setKeyword(keyword.concat(res));
            });
        } else {
            fetchTvbykeyword(props.keyword, newIndexp, sort).then((res) => {
                res === undefined
                    ? setPage(indexp)
                    : setKeyword(keyword.concat(res));
            });
        }
    };

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

    const color = "black";

    return (
        <div className="container mx-auto pt-4">
            <Nav auth={page.props.auth} />

            <div className=" mt-10 ">
                <div
                    className=" h-36 grid gap-0 rounded-lg mb-4 "
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),url(${test})`,
                    }}
                >
                    <div className="flex mt-8 p-2 justify-around items-center">
                        <h1 className="rust text-my_gray2  drop-shadow text-2xl">
                            <span className="text-my_red">
                                {" " + props.type}{" "}
                            </span>
                            Shows
                        </h1>
                        <h1 className=" rust text-my_gray2 text-2xl drop-shadow">
                            <span className="text-my_red">
                                {keyword.length}{" "}
                            </span>{" "}
                            Show
                        </h1>
                    </div>
                    <div className="flex justify-center">
                        <Menu as="div" className="relative inline-block text-left">
                            <Menu.Button className={"flex justify-center items-center gap-1 text-my_white rounded bg-my_gray2/75 p-2 text-sm font-bold"}>
                                {sort}
                                <AiOutlineDown className="text-my_white text-lg font-bold"/>
                            </Menu.Button>
                            <Menu.Items className="dropdown absolute flex flex-col w-full bg-my_gray2/75 text-my_white text-sm rounded shadow-lg my-1">

                                <Menu.Item>
                                    {({ active }) => (
                                       <button
                                       className="hover:bg-my_gray border-b border-my_gray2 h-8 w-full text-left px-2"
                                       onClick={() => setSort("popularity.desc")}>popularity.desc</button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                       className="hover:bg-my_gray border-b border-my_gray2 h-8 w-full text-left px-2"

                                        onClick={() => setSort("popularity.asc")}>popularity.asc</button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                       className="hover:bg-my_gray border-b border-my_gray2 h-8 w-full text-left px-2"

                                        onClick={() => setSort("vote_average.desc")}>vote_average.desc</button>

                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                       className="hover:bg-my_gray border-b border-my_gray2 h-8 w-full text-left px-2"

                                        onClick={() => setSort("vote_average.asc")}>vote_average.asc</button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                       className="hover:bg-my_gray border-b border-my_gray2 h-8 w-full text-left px-2"

                                        onClick={() => setSort("first_air_date.desc")}>first_air_date.desc</button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                       className="hover:bg-my_gray h-8 w-full text-left px-2"

                                        onClick={() => setSort("first_air_date.asc")}>first_air_date.asc</button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
                <div>
                    <div className="grid">
                        {keyword.map((movie) => (
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
                                            href={
                                                "/" +
                                                (props.type === "movie"
                                                    ? "MoviePage"
                                                    : "TvPage") +
                                                "/" +
                                                movie.id
                                            }
                                            className="text-my_gray2 text-sm font-bold hover:text-my_red"
                                        >
                                            {movie.name}
                                        </Link>
                                        <h1 className="text-my_gray2/75 text-sm">
                                            {movie.first_air_date}
                                        </h1>
                                    </div>
                                    <h1 className="text-my_gray2 font-bold text-sm truncate-2-lines">
                                        {getonep(movie.overview)}
                                    </h1>
                                </div>
                            </div>
                        ))}
                    </div>
                    {indexp === 1 && (
                        <button onClick={loadmore} className="mx-2">
                            load more
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Keywordll;
