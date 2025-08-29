import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";

interface Payment {
    id: number;
    plan_type: string;
    amount: number;
    start_date: string;
    end_date: string;
}

interface Member {
    id: number;
    name: string;
    email: string;
    membership_status: string;
    membership_end_date: string | null;
    payments: Payment[];
}

export default function ShowMember({ member }: { member: Member }) {
    const { data, setData, post, processing, reset } = useForm({
        member_id: member.id,
        plan_type: "monthly",
        amount: "",
        start_date: new Date().toISOString().slice(0, 10),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("payments.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <Head title={`Member - ${member.name}`} />

            {/* Member Info */}
            <div className="bg-white shadow rounded-2xl p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Member Information
                </h2>
                <p>
                    <strong>Name:</strong> {member.name}
                </p>
                <p>
                    <strong>Email:</strong> {member.email}
                </p>
                <p>
                    <strong>Status:</strong>
                    <span
                        className={`ml-2 px-2 py-1 rounded text-white ${
                            member.membership_status === "active"
                                ? "bg-green-500"
                                : "bg-red-500"
                        }`}
                    >
                        {member.membership_status}
                    </span>
                </p>
                <p>
                    <strong>Membership Ends:</strong>{" "}
                    {member.membership_end_date ?? "N/A"}
                </p>
            </div>

            {/* Payment History */}
            <div className="bg-white shadow rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Payments History</h2>
                {member.payments.length > 0 ? (
                    <table className="w-full text-left border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border">Plan</th>
                                <th className="p-2 border">Amount</th>
                                <th className="p-2 border">Start Date</th>
                                <th className="p-2 border">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {member.payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td className="p-2 border capitalize">
                                        {payment.plan_type}
                                    </td>
                                    <td className="p-2 border">
                                        {payment.amount} MAD
                                    </td>
                                    <td className="p-2 border">
                                        {payment.start_date}
                                    </td>
                                    <td className="p-2 border">
                                        {payment.end_date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No payments yet.</p>
                )}
            </div>

            {/* Add New Payment */}
            <div className="bg-white shadow rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Add Payment</h2>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div>
                        <label className="block text-sm">Plan Type</label>
                        <select
                            value={data.plan_type}
                            onChange={(e) =>
                                setData("plan_type", e.target.value)
                            }
                            className="border rounded w-full p-2"
                        >
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm">Amount</label>
                        <input
                            type="number"
                            value={data.amount}
                            onChange={(e) => setData("amount", e.target.value)}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm">Start Date</label>
                        <input
                            type="date"
                            value={data.start_date}
                            onChange={(e) =>
                                setData("start_date", e.target.value)
                            }
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        {processing ? "Saving..." : "Add Payment"}
                    </button>
                </form>
            </div>

            {/* Back link */}
            <div className="mt-6">
                <Link
                    href={route("members.index")}
                    className="text-blue-600 hover:underline"
                >
                    ← Back to Members
                </Link>
            </div>
        </div>
    );
}
