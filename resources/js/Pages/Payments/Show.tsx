import React from "react";
// import { PageProps } from "@inertiajs/react";

interface Member {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

interface Payment {
  id: number;
  member_id: number;
  member: Member;
  plan_type: string;
  amount: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  payment: Payment;
}

export default function Show({ payment }: Props) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Payment Details</h1>

      {/* Payment Info */}
      <div className="space-y-2">
        <p><span className="font-semibold">ID:</span> {payment.id}</p>
        <p><span className="font-semibold">Plan:</span> {payment.plan_type}</p>
        <p><span className="font-semibold">Amount:</span> ${payment.amount}</p>
        <p><span className="font-semibold">Start Date:</span> {payment.start_date}</p>
        <p><span className="font-semibold">End Date:</span> {payment.end_date}</p>
      </div>

      {/* Linked Member Info */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Member Information</h2>
        <p><span className="font-semibold">Name:</span> {payment.member.name}</p>
        <p><span className="font-semibold">Email:</span> {payment.member.email}</p>
        {payment.member.phone && (
          <p><span className="font-semibold">Phone:</span> {payment.member.phone}</p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex space-x-4">
        <a
          href={route("payments.edit", payment.id)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </a>
        <a
          href={route("payments.index")}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Back to list
        </a>
      </div>
    </div>
  );
}
