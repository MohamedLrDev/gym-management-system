import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

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
    const [selectedMember, setSelectedMember] = useState<number | null>(null);

    const deleteMember = (id: number) => {
        if (confirm("Are you sure you want to delete this member?")) {
            Inertia.delete(`/members/${id}`);
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "—";
        return new Date(dateString).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'premium':
                return 'text-blue-600';
            case 'basic':
                return 'text-green-600';
            default:
                return 'text-gray-600';
        }
    };

    const isExpiringSoon = (endDate: string | null) => {
        if (!endDate) return false;
        const today = new Date();
        const expiryDate = new Date(endDate);
        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30 && diffDays >= 0;
    };

    const selectedMemberData = selectedMember ? members.find(m => m.id === selectedMember) : null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-gray-900">Gym Management</h1>
                        <Link
                            href="/members/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            + Add Member
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
                                <h2 className="text-lg font-semibold text-gray-900">Members</h2>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {members.length > 0 ? (
                                    members.map((member) => (
                                        <div
                                            key={member.id}
                                            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                                                selectedMember === member.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                                            }`}
                                            onClick={() => setSelectedMember(member.id)}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {member.name}
                                                    </p>
                                                    <p className={`text-sm ${getStatusColor(member.membership_status)} capitalize`}>
                                                        {member.membership_status}
                                                    </p>
                                                </div>
                                                <div className="flex-shrink-0 text-right">
                                                    <p className="text-sm text-gray-500">
                                                        {formatDate(member.membership_end_date)}
                                                    </p>
                                                    {isExpiringSoon(member.membership_end_date) && (
                                                        <p className="text-xs text-red-600 font-medium">No payments</p>
                                                    )}
                                                    <Link
                                                        href={`/members/${member.id}`}
                                                        className="text-xs text-blue-600 hover:underline"
                                                    >
                                                        Record Payment
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No members yet</h3>
                                        <p className="mt-1 text-sm text-gray-500 mb-4">
                                            Get started by adding your first gym member.
                                        </p>
                                        {/* <Link
                                            href="/members/create"
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add First Member
                                        </Link> */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Member Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow h-full">
                            {selectedMemberData ? (
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {selectedMemberData.name}
                                            </h3>
                                            <p className={`text-sm ${getStatusColor(selectedMemberData.membership_status)} capitalize mt-1`}>
                                                {selectedMemberData.membership_status} Member
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
                                                onClick={() => deleteMember(selectedMemberData.id)}
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
                                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                                    <p className="text-sm text-gray-900">{selectedMemberData.email}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">Phone</label>
                                                    <p className="text-sm text-gray-900">{selectedMemberData.phone}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                                                Membership Details
                                            </h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">Status</label>
                                                    <p className={`text-sm ${getStatusColor(selectedMemberData.membership_status)} capitalize font-medium`}>
                                                        {selectedMemberData.membership_status}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">End Date</label>
                                                    <p className="text-sm text-gray-900">
                                                        {formatDate(selectedMemberData.membership_end_date)}
                                                    </p>
                                                    {isExpiringSoon(selectedMemberData.membership_end_date) && (
                                                        <p className="text-xs text-red-600 font-medium mt-1">
                                                            Expires soon - No recent payments
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <Link
                                            href={`/members/${selectedMemberData.id}`}
                                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Record Payment
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">Select a member</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Choose a member from the list to view their details
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}