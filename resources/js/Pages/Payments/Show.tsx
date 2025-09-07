import React from "react";
import { Head, Link } from "@inertiajs/react";

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
  payment: Payment;
}

export default function Show({ payment }: Props) {
  return (
    <>
      <Head title="Payment Details" />
      <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Payment Details</h1>

        <div className="space-y-2">
          <p>
            <span className="font-medium">Member:</span> {payment.member.name}
          </p>
          <p>
            <span className="font-medium">Plan Type:</span> {payment.plan_type}
          </p>
          <p>
            <span className="font-medium">Amount:</span> {payment.amount} MAD
          </p>
          <p>
            <span className="font-medium">Start Date:</span> {payment.start_date}
          </p>
          <p>
            <span className="font-medium">End Date:</span> {payment.end_date}
          </p>
        </div>

        <div className="mt-6 flex justify-between">
          <Link
            href={route("payments.index")}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Back
          </Link>
          <Link
            href={route("payments.edit", payment.id)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </Link>
        </div>
      </div>
    </>
  );
}
