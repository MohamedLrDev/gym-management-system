import React from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
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
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Payments</h1>

        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Member</th>
              <th className="border p-2">Plan</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Start Date</th>
              <th className="border p-2">End Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="border p-2">{payment.member?.name}</td>
                <td className="border p-2 capitalize">{payment.plan_type}</td>
                <td className="border p-2">{payment.amount} MAD</td>
                <td className="border p-2">{payment.start_date}</td>
                <td className="border p-2">{payment.end_date}</td>
                <td className="border p-2 flex gap-2">
                  <Link
                    href={route("payments.show", payment.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Show
                  </Link>
                  <Link
                    href={route("payments.edit", payment.id)}
                    className="text-green-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(payment.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
