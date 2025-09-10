import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import PaymentBtn from "@/Components/PaymentBtn";
import { SquarePen, Trash } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Wallet, BadgePlus } from "lucide-react";

interface Payment {
    id: number;
    plan_type: "monthly" | "yearly";
    amount: string;
    start_date: string;
    end_date: string;
}

interface Member {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    payments: Payment[];
}

interface Props {
    members: Member[];
}

export default function Index({ members }: Props) {
    const { props } = usePage();
    const [search, setSearch] = useState("");
    const flash = props.flash as { success?: string };
    const [selectedMember, setSelectedMember] = useState<number | null>(null);

    // Delete member confirmation
    const deleteMember = (id: number) => {
        if (confirm("Are you sure you want to delete this member?")) {
            Inertia.delete(`/members/${id}`);
        }
    };

    const selectedMemberData = selectedMember
        ? members.find((m) => m.id === selectedMember)
        : null;

    const filteredMembers = members.filter((member) =>
        member.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Gym Management
                        </h1>
                        <Link href="/members/create">
                            <PaymentBtn
                                memberId={null}
                                btnContent="Add Member"
                                btnIcon={<BadgePlus className="text-white" />}
                                btnColor="#2986cc"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Flash Messages */}
            {flash?.success && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        {flash.success}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Members List */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Members
                                </h2>
                            </div>
                            <div className="px-6 py-4">
                                <Input
                                    type="text"
                                    placeholder="Search by name"
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                            </div>
                            <div className="divide-y divide-gray-200">
                                {filteredMembers.length > 0 ? (
                                    filteredMembers.map((member) => (
                                        <div
                                            key={member.id}
                                            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                                                selectedMember === member.id
                                                    ? "bg-blue-50 border-l-4 border-blue-500"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setSelectedMember(member.id)
                                            }
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <svg
                                                            className="w-5 h-5 text-blue-600"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {member.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {member.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center">
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                                            No members yet
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500 mb-4">
                                            Get started by adding your first gym
                                            member.
                                        </p>
                                        <Link
                                            href="/members/create"
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                                        >
                                            Add First Member
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Member Details & Payments */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow h-full">
                            {selectedMemberData ? (
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {selectedMemberData.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {selectedMemberData.email}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Link
                                                href={`/members/${selectedMemberData.id}/edit`}
                                                className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    deleteMember(
                                                        selectedMemberData.id
                                                    )
                                                }
                                                className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                                                Contact Information
                                            </h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">
                                                        Phone
                                                    </label>
                                                    <p className="text-sm text-gray-900">
                                                        {
                                                            selectedMemberData.phone
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payments */}
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                                                Payments
                                            </h4>
                                            {selectedMemberData.payments
                                                .length > 0 ? (
                                                <div className="space-y-3">
                                                    {selectedMemberData.payments.map(
                                                        (payment) => (
                                                            <div
                                                                key={payment.id}
                                                                className="border rounded-lg p-3 bg-gray-50 flex justify-between items-center"
                                                            >
                                                                <div>
                                                                    <p className="text-sm text-gray-700">
                                                                        <span className="font-medium">
                                                                            Plan:
                                                                        </span>{" "}
                                                                        {
                                                                            payment.plan_type
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm text-gray-700">
                                                                        <span className="font-medium">
                                                                            Amount:
                                                                        </span>{" "}
                                                                        {
                                                                            payment.amount
                                                                        }{" "}
                                                                        MAD
                                                                    </p>
                                                                    <p className="text-sm text-gray-700">
                                                                        <span className="font-medium">
                                                                            Period:
                                                                        </span>{" "}
                                                                        {
                                                                            payment.start_date
                                                                        }{" "}
                                                                        →{" "}
                                                                        {
                                                                            payment.end_date
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="flex space-x-2">
                                                                    <Link
                                                                        href={`/payments/${payment.id}/edit`}
                                                                    >
                                                                        <SquarePen className="w-5 h-5 text-green-600" />
                                                                    </Link>
                                                                    <button
                                                                        onClick={() => {
                                                                            if (
                                                                                confirm(
                                                                                    "Are you sure you want to delete this payment?"
                                                                                )
                                                                            ) {
                                                                                Inertia.delete(
                                                                                    `/payments/${payment.id}`
                                                                                );
                                                                            }
                                                                        }}
                                                                    >
                                                                        <Trash className="w-5 h-5 text-red-600" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="bg-gray-100 p-4 rounded text-sm text-gray-600">
                                                    No related payments yet...
                                                </div>
                                            )}

                                            {/* Add Payment */}
                                            <div className="mt-4">
                                                <PaymentBtn
                                                    memberId={
                                                        selectedMemberData.id
                                                    }
                                                    btnContent="Add Payment"
                                                    btnIcon={
                                                        <Wallet className="w-5 h-5 text-white" />
                                                    }
                                                    btnColor="#00ad54"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500">
                                        Select a member to view details
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
