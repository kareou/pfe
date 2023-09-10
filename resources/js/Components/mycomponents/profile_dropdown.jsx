import React from "react";
import Dropdown from "@/Components/Dropdown";

function profile_dropdown({user}) {

    if (user) {
        if (user.image === null) {
            var image = "https://ui-avatars.com/api/?name=" + user.name + "&background=random";
        } else {
            if (user.image.includes("https://")) {
                var image = user.image;
            } else {
                var tmp = user.image.split("/");
                var image = "/storage/" + tmp[1];
            }
        }
    }

    return (
        <div className="hidden sm:flex sm:items-center sm:ml-6">
            <div className="ml-3 relative">
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="rounded-full flex text-sm focus:outline-none focus:ring-transparent"
                            >
                                <img
                                    className="h-10 w-10 rounded-full"
                                src={image} alt="" />
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <h1 className=" text-my_gray2 text-lg px-4 font-semibold">
                            {user.name}
                        </h1>
                        <hr className=" border-my_gray/75" />
                        <Dropdown.Link href={route("profile.edit")}>
                            View Profile
                        </Dropdown.Link>
                        <Dropdown.Link
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
    );
}

export default profile_dropdown;
