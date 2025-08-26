import React from "react";

interface Member {
    id: number;
    name: string;
    email: string;
    phone: string;
    membership_status: string;
    membership_end_date: string;
}

interface IndexProps {
    members: Member[];
}

export default function Index({ members }: IndexProps) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Members List</h1>
            <table className="min-w-full border border-gray-300 text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td className="p-2 border">{member.name}</td>
                            <td className="p-2 border">{member.email}</td>
                            <td className="p-2 border">{member.phone}</td>
                            <td className="p-2 border">{member.membership_status}</td>
                            <td className="p-2 border">{member.membership_end_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
