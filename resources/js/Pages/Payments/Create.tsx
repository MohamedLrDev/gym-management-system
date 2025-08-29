import React, { useState } from "react";
import { useForm, usePage, Link } from "@inertiajs/react";

interface Member {
  id: number;
  name: string;
}

interface Props {
  members: Member[];
}

export default function Create({ members }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    member_id: "",
    plan_type: "monthly",
    amount: "",
    start_date: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/payments");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add Payment</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Member Select */}
        <div>
          <label className="block">Member</label>
          <select
            value={data.member_id}
            onChange={(e) => setData("member_id", e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select Member</option>
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
            onChange={(e) => setData("amount", e.target.value)}
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
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
