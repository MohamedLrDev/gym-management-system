// resources/js/Pages/Payments/Edit.tsx
import { Head, useForm } from "@inertiajs/react";

interface Payment {
    id: number;
    member_id: number;
    plan_type: "monthly" | "yearly";
    amount: number;
    start_date: string;
    end_date: string;
}

interface Props {
    payment: Payment;
}

export default function Edit({ payment }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        member_id: payment.member_id,
        plan_type: payment.plan_type,
        amount: payment.amount,
        start_date: payment.start_date,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/payments/${payment.id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Edit Payment" />
            <div className="max-w-3xl mx-auto py-10 px-4">
                <h1 className="text-2xl font-bold mb-6">Edit Payment</h1>

                <form onSubmit={submit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                    {/* Plan Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Plan Type
                        </label>
                        <select
                            value={data.plan_type}
                            onChange={(e) => setData("plan_type", e.target.value as "monthly" | "yearly")}
                            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                        {errors.plan_type && (
                            <p className="text-red-500 text-sm mt-1">{errors.plan_type}</p>
                        )}
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Amount (MAD)
                        </label>
                        <input
                            type="number"
                            value={data.amount}
                            onChange={(e) => setData("amount", Number(e.target.value))}
                            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                        )}
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={data.start_date}
                            onChange={(e) => setData("start_date", e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.start_date && (
                            <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3">
                        <a
                            href="/payments"
                            className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition"
                        >
                            Cancel
                        </a>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            {processing ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
