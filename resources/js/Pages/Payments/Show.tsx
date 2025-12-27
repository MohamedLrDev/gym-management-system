import React from "react";
import { Payment } from "./PaymentsTable";
import { ArrowLeft } from "lucide-react";

interface Props {
  payment: Payment;
  onClose: () => void;
  onEdit: () => void;
}

export default function Show({ payment, onClose, onEdit }: Props) {
  return (
    <div className="w-full md:w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/60 dark:hover:bg-gray-700/60 transition-colors duration-200"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Payment Details
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-5">
        <div className="space-y-4">
          {/* Member Info - Highlighted */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
              Member
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {payment.member.name}
            </p>
          </div>

          {/* Payment Information Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Plan Type
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {payment.plan_type}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Amount
              </p>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {payment.amount} MAD
              </p>
            </div>
          </div>

          {/* Date Range */}
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Start Date
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {payment.start_date}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  End Date
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {payment.end_date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}