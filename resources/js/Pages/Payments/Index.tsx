import React from "react";
import { Link, usePage, router } from "@inertiajs/react";

interface Member {
  id: number;
  name: string;
  email: string;
}

interface Payment {
  id: number;
  member: Member;
  plan_type: "monthly" | "yearly";
  amount: number;
  start_date: string;
  end_date: string;
}

interface Props {
  payments: Payment[];
}

export default function Index({ payments }: Props) {
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this payment?")) {
      router.delete(`/payments/${id}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Payments</h1>

      <Link
        href="/payments/create"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        + New Payment
      </Link>

      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Member</th>
            <th className="p-2">Plan</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Start Date</th>
            <th className="p-2">End Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b">
              <td className="p-2">{payment.member?.name}</td>
              <td className="p-2 capitalize">{payment.plan_type}</td>
              <td className="p-2">${payment.amount}</td>
              <td className="p-2">{payment.start_date}</td>
              <td className="p-2">{payment.end_date}</td>
              <td className="p-2 space-x-2">
                <Link
                  href={`/payments/${payment.id}/edit`}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(payment.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
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
