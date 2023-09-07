import { Link, Head } from "@inertiajs/react";
import Nav from "../Components/mycomponents/nav";
import React from "react";
import Card from "../Components/mycomponents/card";
import Movies from "../Components/mycomponents/trending";
import Splay from "../Components/mycomponents/main_display";
import MoviePage from "./MoviePage";
import { fetchMovieDetails } from "@/Components/mycomponents/service";
import background from "../assetes/project/1_eYtze01BE5EzuxR_1qT9SA.jpg";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [movie, setMovie] = React.useState(null);
    const [ready, setReady] = React.useState(false);

    React.useEffect(() => {
        fetchMovieDetails(550).then((data) => {
            setMovie(data);
            setReady(true);
        });
    }, []);
    return (
        <div className="pt-4 container mx-auto">
            <Head title="Welcome" />
            <Nav auth={auth} />
            <Splay />
            <div className="flex items-center gap-1 mt-5 px-4">
                <div className="w-[5px] h-[40px] bg-my_red"></div>
                <h1 className=" text-my_gray2 text-xl font-bold">Trending</h1>
            </div>
            <Movies type={"/trending/movie/day"} />
            <div className="flex items-center gap-1 mt-5 px-4">
                <div className="w-[5px] h-[40px] bg-my_red"></div>
                <h1 className=" text-my_gray2 text-xl font-bold">Popular</h1>
            </div>
            <Movies type={"/movie/popular"} />

            {!auth.user && (
            <div
                className="w-full md:h-[240px] py-2 mt-5 text-my_white md:flex items-center gap-16 px-8 grid"
                style={{
                    background: `linear-gradient(rgba(48,56,65,0.75),rgba(48,56,65,0.75)),url(${background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className=" grid gap-4">
                    <h1 className=" text-3xl font-extrabold">Join today</h1>
                    <p className=" font-bold">
                        Get access to maintain your own custom personal lists,
                        track what you've seen and search and filter for what to
                        watch next—regardless if it's in theatres, on TV or
                        available on popular streaming services like Netflix,
                        Amazon Prime Video, FlixOlé, Zee5, and MUBI.
                    </p>
                    <Link
                        className="bg-my_red text-my_white px-4 py-2 rounded font-bold w-[150px] text-center"
                        href="/register"
                    >
                        Sign up for
                    </Link>
                </div>
                <div>
                    <ul className="list-disc text-semibold">
                        <li>Maintain a personal watchlist</li>
                        <li>Filter by your subscribed streaming services and find something to watch</li>
                        <li>Log the movies and TV shows you've seen</li>
                        <li>Build custom lists</li>
                    </ul>
                </div>
            </div>
            )}
            <div className="flex items-center gap-1 mt-5 px-4">
                <div className="w-[5px] h-[40px] bg-my_red"></div>
                <h1 className=" text-my_gray2 text-xl font-bold">Top picks</h1>
            </div>
            <Movies type={"/movie/top_rated"} />
        </div>
    );
}
