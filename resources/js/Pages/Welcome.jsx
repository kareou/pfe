import { Link, Head } from "@inertiajs/react";
import Nav from "../Components/mycomponents/nav";
import React from "react";
import Card from "../Components/mycomponents/card";
import Movies from "../Components/mycomponents/trending";
import Splay from "../Components/mycomponents/main_display";
import MoviePage from "./MoviePage";
import { fetchMovieDetails } from "@/Components/mycomponents/service";



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
        <div className="py-4">
            <Head title="Welcome" />
            <Nav auth={auth} />
            <Splay />
            <Movies type={'/movie/popular'} />
            <Movies type={'/movie/top_rated'} />
            <Movies type={'/trending/movie/day'} />
        </div>
    );
}
