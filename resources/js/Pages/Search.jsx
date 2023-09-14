import React from "react";
import { fetchmomovieseqrch } from "@/Components/mycomponents/service";
import { usePage, Link } from "@inertiajs/react";
import Nav from "@/Components/mycomponents/nav";
import Footer from "@/Components/mycomponents/footer";
import Recomandation from "@/Components/mycomponents/recomandation";
import Randre from "@/Components/mycomponents/randre";
import Movies from "@/Components/mycomponents/trending";
import { fetchMovies } from "@/Components/mycomponents/service";
import waves from "../assetes/project/wave-haikei.svg";

function Search(props) {
    const [movies, setMovies] = React.useState([]);
    const [index, setIndex] = React.useState(1);
    const [nomore, setNomore] = React.useState(false);
    const [nodata, setNodata] = React.useState(false);
    const [ids, setIds] = React.useState([]);
    const [recomandations, setRecomandations] = React.useState([]);

    React.useEffect(() => {
        fetchmomovieseqrch(props.keyword, index).then((data) => {
            if (data.length === 0) setNodata(true);
            setMovies(data);
            setIds(data.map((movie) => movie.id));
        });
        fetchMovies("/movie/upcoming").then((data) => {
            setRecomandations(data);
        });
    }, []);

    const handelclick = () => {
        const tmp = index + 1;
        setIndex(tmp);
        fetchmomovieseqrch(props.keyword, tmp).then((data) => {
            if (data.length === 0 || data.length < 20) setNomore(true);
            setMovies([...movies, ...data]);
        });
    };
    const page = usePage();

    console.log(movies);

    const getimage = (path) => {
        if (path) return `https://image.tmdb.org/t/p/w500/${path}`;
        else
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019";
    };

    return (
        <div className=" container mx-auto pt-4 flex flex-col justify-between">
            <Nav auth={page.props.auth} />
            <h1 className="text-2xl font-bold mt-4">
                Search results for :{" "}
                <span className="underline decoration-my_red">
                    {props.keyword}
                </span>
            </h1>
            <div className="flex items-center gap-1 mt-5 px-4">
                <div className="w-[5px] h-[40px] bg-my_red"></div>
                <h1 className=" text-my_gray2 text-xl font-bold">Titles</h1>
            </div>
            {!nodata && (
                <div className="">
                        <div className="flex flex-wrap justify-center gap-4 p-4 b my-5 ">
                            {movies.map((movie) => (
                                <div className="grid w-52 border border-my_gray2/25 shadow-lg rounded">
                                    <Link
                                        href={
                                            movie.media_type === "movie"
                                                ? `/MoviePage/${movie.id}`
                                                : `/TvPage/${movie.id}`
                                        }
                                    >
                                        <img
                                            className="w-full h-full rounded-t"
                                            src={getimage(movie.poster_path)}
                                            alt=""
                                        />
                                    </Link>
                                    <div className="px-4 box-border bg-white rounded-b">
                                        <Link href={`/MoviePage/${movie.id}`}>
                                            <h1 className="font-bold text-lg text-ellipsis">
                                                {movie.media_type === "movie"
                                                    ? movie.title
                                                    : movie.name}
                                            </h1>
                                        </Link>
                                        <h1>
                                            {movie.media_type === "movie"
                                                ? movie.release_date
                                                : movie.first_air_date}
                                        </h1>
                                        <h1>
                                            {movie.vote_average &&
                                                movie.vote_average.toFixed(1)}
                                        </h1>
                                    </div>
                                </div>
                            ))}

                        </div>
                            {!nomore && (
                                <button
                                    onClick={handelclick}
                                    className="bg-my_red text-my_white px-4 py-2 rounded font-bold w-[150px] text-center"
                                >
                                    Load More
                                </button>
                            )}
                        </div>
            )}
            {nodata && (
                <div className="flex flex-col items-center justify-center gap-4 mt-10">
                    <h1 className="text-2xl font-bold">No results found</h1>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Search;
