import React from "react";
import { Link, router } from "@inertiajs/react";
import { Eye, Edit, Trash2 } from "lucide-react";

interface Member { id: number; name: string; }
export interface Payment {
  id: number;
  plan_type: "monthly" | "yearly";
  amount: number;
  start_date: string;
  end_date: string;
  member: Member;
}

interface Props {
  payments: Payment[];
  onShow: (payment: Payment) => void;
  onEdit: (payment: Payment) => void;
}

export default function PaymentsTable({ payments, onShow, onEdit }: Props) {
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this payment?")) {
      router.delete(route("payments.destroy", id));
    }
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Payments</h1>
        <Link
          href={route("payments.create")}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 px-4 py-2 rounded-lg transition-colors"
        >
          Add
        </Link>
      </div>
      <table className="w-full">
        <thead className="border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Member</th>
            <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Plan</th>
            <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Amount</th>
            <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Period</th>
            <th className="py-2 px-4 text-right text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{payment.member.name}</td>
              <td className="py-2 px-4">
                <span className={`px-2 py-1 rounded text-xs ${
                  payment.plan_type === "yearly" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" :
                  "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}>{payment.plan_type}</span>
              </td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{payment.amount} MAD</td>
              <td className="py-2 px-4 text-gray-600 dark:text-gray-400 text-sm">
                {new Date(payment.start_date).toLocaleDateString()} - {new Date(payment.end_date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 flex justify-end gap-1">
                <button onClick={() => onShow(payment)} className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <Eye className="h-4 w-4" />
                </button>
                <button onClick={() => onEdit(payment)} className="p-1 text-gray-400 hover:text-blue-600 rounded">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(payment.id)} className="p-1 text-gray-400 hover:text-red-600 rounded">
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
