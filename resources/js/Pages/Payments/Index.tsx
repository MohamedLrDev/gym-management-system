import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import AppLayout from "@/Layouts/AppLayout";

interface Member {
  id: number;
  name: string;
}

interface Payment {
  id: number;
  plan_type: "monthly" | "yearly";
  amount: number;
  start_date: string;
  end_date: string;
  member: Member;
}

interface Props {
  payments: Payment[];
}

export default function Index({ payments }: Props) {
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this payment?")) {
      router.delete(route("payments.destroy", id));
    }
  };

  return (
    <AppLayout>
      <Head title="Payments" />
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Payments</h1>
          <Link
            href={route("payments.create")}
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Payment
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Member</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Period</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500 dark:text-gray-400">
                    No payments found
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                      {payment.member?.name || 'Unknown'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded ${
                        payment.plan_type === 'yearly' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {payment.plan_type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                      {payment.amount} MAD
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-sm">
                      {new Date(payment.start_date).toLocaleDateString()} - {new Date(payment.end_date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={route("payments.show", payment.id)}
                          className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={route("payments.edit", payment.id)}
                          className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(payment.id)}
                          className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}