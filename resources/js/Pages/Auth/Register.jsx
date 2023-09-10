import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import vid from "../../../../../../Downloads/pexels-tima-miroshnichenko-7989632 (2160p).mp4";
import { FcGoogle } from "react-icons/fc";
import { IoIosArrowBack } from "react-icons/io";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export default function Register() {
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
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        Image: "",
        password_confirmation: "",
    });

    const [show, setShow] = useState(false);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const [costumi, setCostumi] = useState(false);
    const [typei, setTypei] = useState("button");

    const submit = (e) => {
        e.preventDefault();
        // setData("Image", "https://ui-avatars.com/api/?name=" + data.name);
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className=" box-border ">
                <video
                    autoPlay
                    loop
                    muted
                    className=" object-cover"
                    src={vid}
                    style={{
                        width: "100%",
                        height: "100vh",
                        objectFit: "cover",
                    }}
                ></video>
            </div>

            {!show && (
                <div className="p-8 ml-24 grid gap-1 ">
                    <h1 className=" text-2xl text-my_gray2 font-bold">
                        Sign up to MovieDB
                    </h1>
                    <a
                        href={route("register.redirect")}
                        className="flex items-center border border-my_gray/60 justify-center mt-4 w-96 h-12 bg-my_blue text-my_gray2 rounded-md"
                    >
                        <FcGoogle className="w-6 h-6 mr-2" />
                        <span className="text-sm font-semibold">
                            Sign up with Google
                        </span>
                    </a>
                    <div className="flex items-center mt-4">
                        <div className="flex-grow border-t border-my_gray/60"></div>
                        <div className="mx-4 text-lg text-my_gray2">Or</div>
                        <div className="flex-grow border-t border-my_gray/60"></div>
                    </div>
                    <button
                        className="flex items-center border bg-my_gray border-my_gray/60 justify-center mt-4 w-96 h-12 bg-my_blue text-my_white rounded-md"
                        onClick={() => setShow(!show)}
                    >
                        <span className="text-sm font-semibold">
                            Sign up with Email
                        </span>
                    </button>
                    <Link
                        className="flex justify-center text-sm text-my_gray2 hover:text-my_red/50"
                        href={route("login")}
                    >
                        <span className="">Already have an account?</span>
                        <span className="underline">Sign In</span>
                    </Link>
                </div>
            )}
            {show && (
                <div className="p-8 ml-24 grid gap-1 relative register">
                    <h1 className=" text-2xl text-my_gray2 font-extrabold mb-5">
                        Sign up to MovieDB
                    </h1>
                    <button
                        className=" -top-0 -left-5 absolute border border-my_gray w-10 h-10 rounded flex justify-center place-items-center"
                        onClick={() => setShow(!show)}
                    >
                        <IoIosArrowBack className="w-6 h-6 mr-2" />
                    </button>
                    <form onSubmit={submit} className="flex gap-8">
                        {costumi && (
                            <div className=" upload border-r border-my_gray2/25 p-4">
                                <img
                                    src={
                                        data.image
                                            ? URL.createObjectURL(data.image)
                                            : "https://ui-avatars.com/api/?name=" +
                                                data.name + "&background=random"
                                    }
                                    title="profile change depend on name"
                                    alt=""
                                    className="w-44 h-44 rounded-full object-cover"
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
                        )}
                        <div className="">
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="  mt-1 block w-96 focus:ring-my_red/50 focus:ring-1 focus:border-none focus:shadow-my_red/75 focus:shadow-lg sm:text-sm border-gray-300 rounded-md"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="  mt-1 block w-96 focus:ring-my_red/50 focus:ring-1 focus:border-none focus:shadow-my_red/75 focus:shadow-lg sm:text-sm border-gray-300 rounded-md"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="  mt-1 block w-96 focus:ring-my_red/50 focus:ring-1 focus:border-none focus:shadow-my_red/75 focus:shadow-lg sm:text-sm border-gray-300 rounded-md"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="  mt-1 block w-96 focus:ring-my_red/50 focus:ring-1 focus:border-none focus:shadow-my_red/75 focus:shadow-lg sm:text-sm border-gray-300 rounded-md"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>
                            <span
                                onClick={() => setCostumi(!costumi)}
                                className="flex items-center border bg-my_red drop-shadow-md px-4 justify-center mt-4 w-max h-12 bg-my_blue text-my_white rounded-md cursor-pointer"
                            >
                                use
                                {costumi ? " default" : " custom"} image
                            </span>
                            <div className="grid grid-row-2 gap-4 mt-4">
                                <PrimaryButton
                                    className=" flex justify-center  mt-4 w-96  sm:text-sm border-gray-300 rounded-md"
                                    disabled={processing}
                                >
                                    Create Account
                                </PrimaryButton>
                                <Link
                                    className="flex justify-center text-sm text-my_gray2 hover:text-my_red/50"
                                    href={route("login")}
                                >
                                    <span className="">
                                        Already have an account?
                                    </span>
                                    <span className="underline">Sign In</span>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </GuestLayout>
    );
}
