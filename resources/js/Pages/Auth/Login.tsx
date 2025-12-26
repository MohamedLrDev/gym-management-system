import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Mail, Lock, Loader2, Dumbbell, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="flex items-center justify-center bg-white dark:bg-gray-900 py-9 px-4">
                <div className="w-full max-w-sm">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mx-auto w-12 h-12 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center mb-4">
                            <Dumbbell className="w-6 h-6 text-white dark:text-gray-900" />
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Sign in
                        </h1>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-6 p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-700 dark:text-green-400">
                            {status}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                className="sr-only"
                            />
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="pl-10 w-full h-12 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-gray-900 dark:focus:border-white focus:ring-0 transition-colors"
                                    placeholder="Email"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                            </div>
                            <InputError
                                message={errors.email}
                                className="mt-1"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="sr-only"
                            />
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <TextInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    className="pl-10 pr-10 w-full h-12 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-gray-900 dark:focus:border-white focus:ring-0 transition-colors"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    onMouseDown={() => setShowPassword(true)}
                                    onMouseUp={() => setShowPassword(false)}
                                    onMouseLeave={() => setShowPassword(false)} // hides if cursor leaves
                                    onTouchStart={() => setShowPassword(true)} // for mobile
                                    onTouchEnd={() => setShowPassword(false)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            <InputError
                                message={errors.password}
                                className="mt-1"
                            />
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-600 dark:text-gray-400">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData(
                                            "remember",
                                            (e.target.checked || false) as false
                                        )
                                    }
                                    className="mr-2 rounded border-gray-300 dark:border-gray-600 text-gray-900 focus:ring-0"
                                />
                                Remember me
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        {/* Submit Button */}
                        <PrimaryButton
                            className="w-full h-12 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 focus:bg-gray-800 dark:focus:bg-gray-100 rounded-lg font-medium transition-colors flex items-center justify-center"
                            disabled={processing}
                        >
                            {processing ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Sign in"
                            )}
                        </PrimaryButton>
                    </form>

                    {/* Register Link */}
                    <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{" "}
                        <Link
                            href={route("register")}
                            className="text-gray-900 dark:text-white hover:underline font-medium"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
