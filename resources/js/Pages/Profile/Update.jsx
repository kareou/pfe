import React from "react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { usePage, useForm } from "@inertiajs/react";
import Nav from "@/Components/mycomponents/Nav";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

function update({ mustVerifyEmail, status }) {
    const { data, setData, post, processing, errors } = useForm({
        image: null,
    });

    const { auth } = usePage().props;
    const VisuallyHiddenInput = styled("input")`
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        bottom: 0;
        left: 0;
        white-space: nowrap;
        width: 1px;
    `;

    function handleSubmit(e) {
        e.preventDefault();
        post(route("updateimg"));
    }

    if (auth.user.image === null) {
        var imqge =
            "https://ui-avatars.com/api/?name=" +
            auth.user.name +
            "&background=random";
    } else {
        if (auth.user.image.includes("https://")) {
            var imqge = auth.user.image;
        } else {
            var tmp = auth.user.image.split("/");
            var imqge = "/storage/" + tmp[1];
        }
    }

    return (
        <div className=" container mx-auto">
            <Nav auth={auth} />
            <div className="">
                <div className="">
                    <h1>edit image</h1>
                    <form action="" className="flex" onSubmit={handleSubmit}>
                        <img
                            src={
                                data.image
                                    ? URL.createObjectURL(data.image)
                                    : imqge
                            }
                            title="profile change depend on name"
                            alt=""
                            className="w-28 h-28 rounded-full object-cover"
                        />
                        <div className="grid align-middle justify-items-center">
                            <Button
                                component="label"
                                variant="contained"
                                href="#file-upload"
                                sx={{
                                    backgroundColor: "#1f2937",
                                    color: "#fff",
                                    marginTop: "1rem",
                                    marginX: "1rem",
                                    height: "3rem",
                                    "&:hover": {
                                        backgroundColor: "#1f2937",
                                        color: "#fff",
                                    },
                                }}
                                onChange={(e) =>
                                    setData("image", e.target.files[0])
                                }
                            >
                                Upload a file
                                <VisuallyHiddenInput type="file" />
                            </Button>
                            <input
                                className="bg-my_gray2 text-my_white px-2 h-10 drop-shadow-md rounded"
                                type="submit"
                                value="submite"
                            />
                        </div>
                    </form>
                </div>
                <UpdateProfileInformationForm
                    mustVerifyEmail={false}
                    status={null}
                    className="max-w-xl"
                />
                <UpdatePasswordForm className="max-w-xl" />
                <DeleteUserForm className="max-w-xl" />
            </div>
        </div>
    );
}

export default update;
