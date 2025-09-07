import React from "react";
import { useForm } from "@inertiajs/react";

export default function CreateMember() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/members"); // matches your store route
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h1 className="text-xl font-bold mb-4">Add Member</h1>
            <form onSubmit={submit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm">
                            {errors.name}
                        </div>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.email && (
                        <div className="text-red-500 text-sm">
                            {errors.email}
                        </div>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.phone && (
                        <div className="text-red-500 text-sm">
                            {errors.phone}
                        </div>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {processing ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );
}
