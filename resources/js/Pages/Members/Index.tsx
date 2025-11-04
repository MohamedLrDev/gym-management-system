import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import PaymentBtn from "@/Components/PaymentBtn";
import {
    SquarePen,
    Trash,
    Users,
    Plus,
    Wallet,
    Edit,
    Trash2,
} from "lucide-react";
import { Input } from "@/Components/ui/input";
import AppLayout from "@/Layouts/AppLayout";
import StyledBtn from "@/Components/StyledBtn";

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
        <AppLayout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="p-4">
                        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-3 rounded-lg text-sm">
                            {flash.success}
                        </div>
                    </div>
                )}
                {/* Header */}
                <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-gray-900 dark:text-white" />
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Members ({members.length})
                        </h1>
                    </div>
                    <Link
                        href="/members/create"
                        className="flex items-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm font-medium"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Member
                    </Link>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Members List */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Members
                                    </h2>
                                </div>
                                <div className="py-3 bg-gray-50 dark:bg-gray-900">
                                    <Input
                                        type="text"
                                        placeholder="Search by name"
                                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        value={search}
                                    />
                                </div>
                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredMembers.length > 0 ? (
                                        filteredMembers.map((member) => (
                                            <div
                                                key={member.id}
                                                className={`p-4 cursor-pointer transition-colors ${
                                                    selectedMember === member.id
                                                        ? "bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500"
                                                        : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                }`}
                                                onClick={() =>
                                                    setSelectedMember(member.id)
                                                }
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                            <svg
                                                                className="w-5 h-5 text-blue-600 dark:text-blue-400"
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
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                            {member.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                            {member.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center">
                                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                                No members yet
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                                Get started by adding your first
                                                gym member.
                                            </p>
                                            <Link
                                                href="/members/create"
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
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
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow h-full">
                                {selectedMemberData ? (
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    {selectedMemberData.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                    {selectedMemberData.email}
                                                </p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/members/${selectedMemberData.id}/edit`}
                                                >
                                                    <StyledBtn
                                                        title="Edit"
                                                        icon={<Edit />}
                                                        color="#3F72AF"
                                                    />
                                                </Link>
                                                <div>
                                                    <StyledBtn
                                                        title="Delete"
                                                        icon={<Trash />}
                                                        color="#E63946"
                                                        onClick={() =>
                                                            deleteMember(
                                                                selectedMemberData.id
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                                                    Contact Information
                                                </h4>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Phone
                                                        </label>
                                                        <p className="text-sm text-gray-900 dark:text-white">
                                                            {
                                                                selectedMemberData.phone
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Payments */}
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                                                    Payments
                                                </h4>
                                                {selectedMemberData.payments
                                                    .length > 0 ? (
                                                    <div className="space-y-3">
                                                        {selectedMemberData.payments.map(
                                                            (payment) => (
                                                                <div
                                                                    key={
                                                                        payment.id
                                                                    }
                                                                    className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 flex justify-between items-center"
                                                                >
                                                                    <div>
                                                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                                                            <span className="font-medium">
                                                                                Plan:
                                                                            </span>{" "}
                                                                            {
                                                                                payment.plan_type
                                                                            }
                                                                        </p>
                                                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                                                            <span className="font-medium">
                                                                                Amount:
                                                                            </span>{" "}
                                                                            {
                                                                                payment.amount
                                                                            }{" "}
                                                                            MAD
                                                                        </p>
                                                                        <p className="text-sm text-gray-700 dark:text-gray-300">
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
                                                                    <div className="flex">
                                                                        <Link
                                                                            href={`/payments/${payment.id}/edit`}
                                                                            className="p-1 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                                                                        >
                                                                            <Edit className="w-5 h-5" />
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
                                                                            className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                                                        >
                                                                            <Trash2 className="h-5 w-5" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm text-gray-600 dark:text-gray-300">
                                                        No related payments
                                                        yet...
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
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Select a member to view details
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
