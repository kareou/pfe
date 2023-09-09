import React from "react";
import { useEffect, useState } from "react";
import Card from "../card";
import Knowcard from "./knowcard";
import Carrier from "./carrier";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";

function bio({ knownFor, actor, sorted, social }) {
    const [topten, setTopten] = useState([]);


    useEffect(() => {
        const filter = knownFor.sort((a, b) => b.popularity - a.popularity);
        const sliced = filter.slice(0, 8);

        setTopten(sliced.sort((a, b) => b.vote_average - a.vote_average));
    }, [knownFor]);

    console.log(sorted);

    const image = `https://image.tmdb.org/t/p/w500/${actor.profile_path}`;
    return (
        <div className="md:flex md:flex-nowrap grid box-border gap-8">
            <div className=" grid h-max">
                <img
                    className="w-full h-max rounded-md drop-shadow-md"
                    src={image}
                    alt=""
                />

                <div className=" flex gap-4 mt-5">
                    {social.facebook_id && (
                        <a
                            target="_blank"
                            href={`https://www.facebook.com/${social.facebook_id}`}
                        >
                            <BsFacebook className="text-3xl" />
                        </a>
                    )}
                    {social.instagram_id && (
                        <a
                            target="_blank"
                            href={`https://www.instagram.com/${social.instagram_id}`}
                        >
                            <BsInstagram className="text-3xl" />
                        </a>
                    )}
                    {social.twitter_id && (
                        <a
                            target="_blank"
                            href={`https://twitter.com/${social.twitter_id}`}
                        >
                            <BsTwitter className="text-3xl" />
                        </a>
                    )}
                </div>
                <div className=" mt-5 inde md:block hidden">
                    <div className="flex items-center gap-1">
                        <div className="w-[5px] h-[40px] bg-my_red"></div>
                        <h1 className=" text-my_gray2 text-xl font-bold">
                            Personal infos
                        </h1>
                    </div>
                    <div className=" grid gap-4 mt-4">
                        <span>
                            <h1 className=" text-my_red font-bold text-lg">
                                known for :
                            </h1>
                            <p>{actor.known_for_department}</p>
                        </span>
                        <span>
                            <h1 className=" text-my_red font-bold text-lg">
                                Birthday :
                            </h1>
                            <p>{actor.birthday}</p>
                        </span>
                        <span>
                            <h1 className=" text-my_red  font-bold text-lg">
                                Place of birth :
                            </h1>
                            <p>{actor.place_of_birth}</p>
                        </span>
                        <span>
                            <h1 className=" text-my_red  font-bold text-lg">
                                Also known as :
                            </h1>
                            {actor.also_known_as &&
                                actor.also_known_as.map((name, index) => (
                                    <p key={index}>{name}</p>
                                ))}
                        </span>
                    </div>
                </div>
            </div>
            <div className=" w-full h-max grid gap-2 ">
                <h1 className=" text-2xl font-extrabold">{actor.name}</h1>
                <h2 className=" text-xl font-semibold">Biographie</h2>
                {actor.biography &&
                    actor.biography.split("\n").map((paragraph, index) => (
                        <p
                            key={index}
                            className="text-justify text-base lg:text-lg truncate-2-lines"
                        >
                            {paragraph}
                        </p>
                    ))}
                <div className=" box-border grid gap-1">
                    <h2 className=" text-xl font-semibold">Known for</h2>
                    <div className=" gap-2 scroll-container">
                        {topten.map((movie) => (
                            <Knowcard
                                movie={movie}
                                actor={movie.character}
                                key={movie.id}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <div className="grid gap-3 mt-5">
                        <div className="flex items-center gap-1">
                            <div className="w-[5px] h-[40px] bg-my_red"></div>
                            <h1 className=" text-my_gray2 text-xl font-bold">
                                Carriére
                            </h1>
                        </div>
                        <Carrier sorted={sorted} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default bio;
