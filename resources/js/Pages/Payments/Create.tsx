import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";

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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("payments.store"));
  };

  return (
    <>
      <Head title="Add Payment" />
      <div className="p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add Payment</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Member</label>
            <select
              value={data.member_id}
              onChange={(e) => setData("member_id", e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">Select a member</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            {errors.member_id && (
              <div className="text-red-600">{errors.member_id}</div>
            )}
          </div>

          <div>
            <label className="block">Plan Type</label>
            <select
              value={data.plan_type}
              onChange={(e) => setData("plan_type", e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label className="block">Amount</label>
            <input
              type="number"
              value={data.amount}
              onChange={(e) => setData("amount", e.target.value)}
              className="w-full border rounded p-2"
            />
            {errors.amount && (
              <div className="text-red-600">{errors.amount}</div>
            )}
          </div>

          <div className="flex justify-between">
            <Link
              href={route("payments.index")}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
