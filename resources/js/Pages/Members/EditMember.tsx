import { useForm } from "@inertiajs/react";

export default function EditMember({ member }: { member: any }) {
    const { data, setData, put, processing, errors } = useForm<{
        name: string;
        email: string;
        phone: string;
        
    }>({
        name: member.name || "",
        email: member.email || "",
        phone: member.phone || "",
        
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
