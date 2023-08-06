import React from "react";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";

function carrier({ sorted }) {
    const groupedMovies = _.groupBy(
        sorted,
        (movie) => movie.release_date.split("-")[0]
    );

    return (
        <div className="">
            <table
                className=" border border-my_gray2 box-border w-full"
                style={{
                    boxShadow: "0px 0px 5px 0px #000000",
                    borderRadius: "10px",
                }}
            >
                <tbody>
                    {Object.entries(groupedMovies).map(([year, movies]) => (
                        <tr className=" border border-my_gray2">
                            <td>
                                <table>
                                    <tbody>
                                        {movies.map((movie) => (
                                            <tr className="flex gap-8 px-4 py-2">
                                                <td>
                                                    {year === "" ? (
                                                        <p>-</p>
                                                    ) : (
                                                        <p>{year}</p>
                                                    )}
                                                </td>
                                                <td className="grid">
                                                    <span className="font-semibold">
                                                        <Link
                                                            href={`/MoviePage/${movie.id}`}
                                                        >
                                                            {movie.title}
                                                        </Link>
                                                    </span>
                                                    <span className=" -mt-2 ml-2 font-thin text-sm">
                                                        As {movie.character}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default carrier;
