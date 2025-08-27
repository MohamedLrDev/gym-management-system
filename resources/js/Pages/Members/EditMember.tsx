import { useForm } from "@inertiajs/react";

export default function EditMember({ member }: { member: any }) {
    const { data, setData, put, processing, errors } = useForm<{
        name: string;
        email: string;
        phone: string;
        membership_status: string;
        membership_end_date: string;
    }>({
        name: member.name || "",
        email: member.email || "",
        phone: member.phone || "",
        membership_status: member.membership_status || "active",
        membership_end_date: member.membership_end_date || "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/members/${member.id}`);
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Edit Member</h1>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.name && (
                        <div className="text-red-600">{errors.name}</div>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.email && (
                        <div className="text-red-600">{errors.email}</div>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Phone</label>
                    <input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1">Membership Status</label>
                    <select
                        value={data.membership_status}
                        onChange={(e) =>
                            setData("membership_status", e.target.value)
                        }
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1">End Date</label>
                    <input
                        type="date"
                        value={data.membership_end_date}
                        onChange={(e) =>
                            setData("membership_end_date", e.target.value)
                        }
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Update
                </button>
            </form>
        </div>
    );
}
