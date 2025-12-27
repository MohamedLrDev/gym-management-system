import React from "react";
import { Payment } from "./PaymentsTable";
import { router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

type FormDataType = {
    plan_type: "monthly" | "yearly";
    amount: number;
    start_date: string;
};

interface Props {
    payment: Payment;
    formData: FormDataType;
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
    onCancel: () => void;
}

export default function Edit({
    payment,
    formData,
    setFormData,
    onCancel,
}: Props) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route("payments.update", payment.id), formData);
        onCancel();
    };

    return (
        <div className="w-full md:w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onCancel}
                        className="p-1.5 rounded-lg hover:bg-white/60 dark:hover:bg-gray-700/60 transition-colors duration-200"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Edit Payment
                    </h2>
                </div>
            </div>

            {/* Form Section */}
            <div className="px-6 py-5 space-y-5">
                {/* Member Info - Read Only */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        Member
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {payment.member.name}
                    </p>
                </div>

                {/* Plan Type Field */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                        Plan Type
                    </label>
                    <select
                        value={formData.plan_type}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                plan_type: e.target.value as
                                    | "monthly"
                                    | "yearly",
                            })
                        }
                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>

                {/* Amount Field */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                        Amount (MAD)
                    </label>
                    <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                amount: Number(e.target.value),
                            })
                        }
                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Enter amount"
                        min="0"
                        step="0.01"
                    />
                </div>

                {/* Start Date Field */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={formData.start_date}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                start_date: e.target.value,
                            })
                        }
                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-700 flex justify-center gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
