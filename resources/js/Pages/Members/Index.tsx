import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

interface Props {
    members: {
        id: number;
        name: string;
        email: string;
        phone: string;
        membership_status: string;
        membership_end_date: string | null;
    }[];
}

export default function Index({ members }: Props) {
    const { props } = usePage();
    const flash = props.flash as { success?: string };
    const deleteMember = (id: number) => {
        if (confirm("Are you sure you want to delete this member?")) {
            Inertia.delete(`/members/${id}`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Members</h1>
                <Link
                    href="/members/create"
                    className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                >
                    + Add Member
                </Link>
            </div>

            {flash?.success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {flash.success}
                </div>
            )}

            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-3 py-2">Name</th>
                        <th className="border px-3 py-2">Email</th>
                        <th className="border px-3 py-2">Phone</th>
                        <th className="border px-3 py-2">Status</th>
                        <th className="border px-3 py-2">End Date</th>
                        <th className="border px-3 py-2 bg-blue-500 text-white">
                            Edit
                        </th>
                        <th className="border px-3 py-2 bg-red-500 text-white">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td className="border px-3 py-2">{member.name}</td>
                            <td className="border px-3 py-2">{member.email}</td>
                            <td className="border px-3 py-2">{member.phone}</td>
                            <td className="border px-3 py-2">
                                {member.membership_status}
                            </td>
                            <td className="border px-3 py-2">
                                {member.membership_end_date ?? "—"}
                            </td>
                            <td className="border px-3 py-2">
                                <Link
                                    href={`/members/${member.id}/edit`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>
                            </td>
                            <td className="border px-3 py-2">
                                <button
                                    onClick={() => deleteMember(member.id)}
                                    className="bg-red-600 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
