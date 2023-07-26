import { Link, Head } from "@inertiajs/react";
import Nav from "../Components/mycomponents/nav";
import React from "react";
import Card from "../Components/mycomponents/card";
import Movies from "../Components/mycomponents/trending";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            {/* <Nav auth={auth} /> */}
            <Movies type={'/trending/movie/day'} />
            {/* <Movies type={'/movie/popular'} /> */}
            {/* <Movies type={'/movie/top_rated'} /> */}
        </>
    );
}
