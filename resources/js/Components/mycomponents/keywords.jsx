import React from "react";
import { Link } from "@inertiajs/react";

function keywords({ keyword, type }) {
    return (
        <div>
            <h1 className=" md:text-base font-semibold text-xl md:my-0 my-5 ">Keywords</h1>
            <div className="flex flex-wrap gap-1 md:flex-no-wrap">
                {keyword.map((keywo) => (
                    <Link
                        href={`/shows/${keywo.id}-${type}-${keywo.name}`}
                        key={keywo.id}
                        className="bg-my_gray h-6 w-max text-my_white text-sm font-bold p-2 rounded inline-flex items-center"
                    >
                        <span className="">{keywo.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default keywords;
