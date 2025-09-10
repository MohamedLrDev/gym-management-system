import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import "../../css/PaymentBtn.css";
import { Wallet } from "lucide-react";

interface Props {
  memberId: number | null; // pass the selected member's ID
  btnContent: string; // pass the selected member's ID
  btnIcon?: React.ReactNode; // optional icon prop
  btnColor?: string; // optional color prop
}

export default function PaymentBtn({ memberId, btnContent, btnIcon, btnColor }: Props) {
  const [open, setOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    member_id: memberId,
    plan_type: "monthly",
    amount: "",
    start_date: new Date().toISOString().split("T")[0], // default today
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/payments", {
      onSuccess: () => {
        setOpen(false); // close modal
        reset("amount", "plan_type"); // reset form fields
      },
    });
  };

  return (
    <>
      <button
        className="button"
        style={{ "--clr": btnColor } as React.CSSProperties}
        onClick={() => setOpen(true)}
      >
        <span className="button-decor"></span>
        <div className="button-content">
          <div className="button__icon">
            {btnIcon}
          </div>
          <span className="button__text"> {btnContent}</span>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow p-6 w-80">
            <h2 className="text-xl font-semibold mb-4">Add Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Plan Type</label>
                <select
                  value={data.plan_type}
                  onChange={(e) => setData("plan_type", e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                {errors.plan_type && (
                  <div className="text-red-600 text-sm">{errors.plan_type}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Amount</label>
                <input
                  type="number"
                  value={data.amount}
                  onChange={(e) => setData("amount", e.target.value)}
                  className="w-full border rounded p-2"
                  min={0}
                />
                {errors.amount && (
                  <div className="text-red-600 text-sm">{errors.amount}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Start Date</label>
                <input
                  type="date"
                  value={data.start_date}
                  onChange={(e) => setData("start_date", e.target.value)}
                  className="w-full border rounded p-2"
                />
                {errors.start_date && (
                  <div className="text-red-600 text-sm">{errors.start_date}</div>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
