import React from "react";
import { useForm } from "@inertiajs/react";

export default function CreateMember() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        membership_status: "active",
        membership_end_date: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/members"); // matches your route
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h1 className="text-xl font-bold mb-4">Add Member</h1>
            <form onSubmit={submit} className="space-y-4">
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

                <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select
                        value={data.membership_status}
                        onChange={(e) =>
                            setData("membership_status", e.target.value)
                        }
                        className="w-full border p-2 rounded"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        End Date
                    </label>
                    <input
                        type="date"
                        value={data.membership_end_date}
                        onChange={(e) =>
                            setData("membership_end_date", e.target.value)
                        }
                        className="w-full border p-2 rounded"
                    />
                </div>

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
