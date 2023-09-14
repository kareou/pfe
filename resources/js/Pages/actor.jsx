import React from "react";
import Bio from "../Components/mycomponents/actor/bio";
import { useEffect, useState } from "react";
import {
    fetchActor,
    fetchActorImages,
    fetchActorKnownFor,
    fetchActorSocial,
} from "@/Components/mycomponents/service";
import Carrier from "@/Components/mycomponents/actor/carrier";
import { Skeleton } from "@mui/material";
import Nav from "@/Components/mycomponents/nav";
import { usePage } from "@inertiajs/react";
import Footer from "@/Components/mycomponents/footer";

function actor(props) {
    const id = props.actor;
    const [actor, setActor] = useState([]);
    const [knownFor, setKnownFor] = useState([]);
    const [sorted, setSorted] = useState([]);
    const [loading, setLoading] = useState(true);
    const [social, setSocial] = useState([]);
    const [images, setImages] = useState([]);
    const page = usePage();

    useEffect(() => {
        fetchActor(id).then(setActor);
        fetchActorSocial(id).then(setSocial);
        fetchActorImages(id).then(setImages);
    }, []);
    useEffect(() => {
        fetchActorKnownFor(id).then((knownForData) => {
            setKnownFor(knownForData);
            setSorted(
                knownForData.sort((a, b) => b.release_date - a.release_date)
            );
            setLoading(false);
        });
    }, [actor]);

    console.log(knownFor);

    return (
        <div className="pt-4 container mx-auto flex flex-col justify-between">
            <Nav auth={page.props.auth} />
            <div className="mx-8 text-my_gray2 mt-10">
                {!loading && (
                    <>
                        <Bio
                            actor={actor}
                            knownFor={knownFor}
                            sorted={sorted}
                            social={social}
                        />

                        <div className=" mt-5 grid gap-3">
                            <div className="flex items-center gap-1">
                                <div className="w-[5px] h-[40px] bg-my_red"></div>
                                <h1 className=" text-my_gray2 text-xl font-bold">
                                    Photos
                                </h1>
                            </div>
                            <div className=" scroll-container gap-4">
                                {loading ? (
                                    <Skeleton
                                        variant="rectangular"
                                        width={1000}
                                        height={150}
                                    />
                                ) : (
                                    images.map((image) => (
                                        <img
                                            className="rounded-md drop-shadow-md h-[150px] w-[200px]"
                                            src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                            alt=""
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default actor;
