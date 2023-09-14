import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FcGoogle } from "react-icons/fc";
import vid from "../../assetes/project/pexels-tima-miroshnichenko-7989632 (2160p).mp4";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const errcheck = usePage().props;


    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <div className=" box-border md:block hidden">
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
            <div className="p-8 md:ml-24 grid gap-1 ">
                <h1 className=" text-2xl text-my_gray2 font-bold">
                    Sign in to moviedb
                </h1>

                <a
                    href={route("login.redirect")}
                    className="flex items-center border border-my_gray/60 justify-center mt-4 md:w-96 w-80 h-12 bg-my_blue text-my_gray2 rounded-md"
                >
                    <FcGoogle className="w-6 h-6 mr-2" />
                    <span className="text-sm font-semibold">
                        Sign in with Google
                    </span>
                </a>

                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-my_gray/60"></div>
                    <span className="mx-4 text-my_gray2 font-semibold">
                        or Sign with Email
                    </span>
                    <div className="flex-grow border-t border-my_gray/60"></div>
                </div>

                <form onSubmit={submit} className="grid gap-2">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="  mt-1 block md:w-96 w-80 focus:ring-my_red/50 focus:ring-1 focus:border-none focus:shadow-my_red/75 focus:shadow-lg sm:text-sm border-gray-300 rounded-md"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError
                            message={errcheck.errors.email}
                            className="mt-2"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4 relative">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="  mt-1 block md:w-96 w-80 focus:ring-my_red/50 focus:ring-1 focus:border-none focus:shadow-my_red/75 focus:shadow-lg sm:text-sm border-gray-300 rounded-md"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="absolute underline top-0 right-0 text-sm text-my_gray2 hover:text-my_red/50"
                            >
                                Forgot?
                            </Link>
                        )}
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <PrimaryButton
                        className=" flex justify-center  mt-4 md:w-96 w-80  sm:text-sm border-gray-300 rounded-md"
                        disabled={processing}
                    >
                        Log in
                    </PrimaryButton>
                </form>
                <Link
                    className="flex justify-center text-sm text-my_gray2 hover:text-my_red/50"
                    href={route("register")}
                >
                    <span className="">Don't have an account?</span>
                    <span className="underline">Sign Up</span>
                </Link>
            </div>
        </GuestLayout>
    );
}
