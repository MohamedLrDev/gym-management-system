import React from "react";
import { useForm } from "@inertiajs/react";

interface Member {
  id: number;
  name: string;
}

interface Payment {
  id: number;
  member_id: number;
  plan_type: "monthly" | "yearly" | string ;
  amount: number;
  start_date: string;
  end_date: string;
}

interface Props {
  payment: Payment;
  members: Member[];
}

export default function Edit({ payment, members }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    member_id: payment.member_id,
    plan_type: payment.plan_type,
    amount: payment.amount,
    start_date: payment.start_date,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/payments/${payment.id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Payment</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Member Select */}
        <div>
          <label className="block">Member</label>
          <select
            value={data.member_id}
            onChange={(e) => setData("member_id", Number(e.target.value))}
            className="border p-2 w-full"
          >
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          {errors.member_id && (
            <div className="text-red-500 text-sm">{errors.member_id}</div>
          )}
        </div>

        {/* Plan Type */}
        <div>
          <label className="block">Plan Type</label>
          <select
            value={data.plan_type}
            onChange={(e) => setData("plan_type", e.target.value)}
            className="border p-2 w-full"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block">Amount</label>
          <input
            type="number"
            value={data.amount}
            onChange={(e) => setData("amount", Number(e.target.value))}
            className="border p-2 w-full"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block">Start Date</label>
          <input
            type="date"
            value={data.start_date}
            onChange={(e) => setData("start_date", e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={processing}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
