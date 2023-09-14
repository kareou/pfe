import React from "react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { usePage, useForm } from "@inertiajs/react";
import Nav from "@/Components/mycomponents/Nav";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Footer from "@/Components/mycomponents/Footer";
import PrimaryButton from '@/Components/PrimaryButton';


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
        <div className=" container pt-4 mx-auto flex flex-col justify-between">
            <Nav auth={auth} />
            <div className="mt-10 grid grid-cols-2 gap-8">

                <UpdateProfileInformationForm
                    mustVerifyEmail={false}
                    status={null}
                    className="max-w-xl bg-white rounded shodow-lg p-8"
                />
                <UpdatePasswordForm className="max-w-xl bg-white rounded shodow-lg p-8" />
                <div className="bg-white rounded shodow-lg max-w-xl p-8">
                    <h2 className="text-lg font-bold border-b">Update image</h2>
                    <h2 className="mt-1 text-sm text-gray-600">Update your account's profile image</h2>
                    <form action="" className="grid justify-items-start gap-4 mt-5" onSubmit={handleSubmit}>
                    <div className="flex justify-items-center">

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

                        </div>
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    </form>
                </div>
                <DeleteUserForm className="max-w-xl bg-white rounded shodow-lg p-8" />
            </div>
            <Footer />
        </div>
    );
}

export default update;
