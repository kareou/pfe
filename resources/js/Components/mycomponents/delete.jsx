import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { ImBin } from "react-icons/im";


function del(props) {

    const { data, setData, post, processing } = useForm({
        movie_id: props.movie.id + ":" + (props.section[1] === "M" ? "movie" : "t")
    });

    const getdelete = () => {
        if (props.type === "f") {
            return "/favorite";
        } else if (props.type === "w") {
            return "/watchlist";
        } else {
            return "/watched";
        }
    };

    function submit(e) {
        e.preventDefault();
        post(getdelete());
        location.reload();

    }
    return (
        <div>
            <form onSubmit={submit}>
                <button
                    type="submit"
                    className=" bg-my_red text-white w-max h-max rounded-md"
                    title="remove from favorite"
                >
                    <ImBin className="text-2xl m-2" />
                </button>
            </form>
        </div>
    );
}

export default del;
