import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import PaymentsTable, { Payment } from "./PaymentsTable";
import ShowPayment from "./ShowPayment";
import EditPayment from "./EditPayment";

interface Props { payments: Payment[] }

export default function Index({ payments }: Props) {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ plan_type: "monthly" as "monthly" | "yearly", amount: 0, start_date: "" });

  const handleShow = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsEditing(false);
  };

  const handleEdit = (payment: Payment) => {
    setSelectedPayment(payment);
    setFormData({ plan_type: payment.plan_type, amount: payment.amount, start_date: payment.start_date });
    setIsEditing(true);
  };

  const handleClose = () => setSelectedPayment(null);

  return (
    <AppLayout>
      <Head title="Payments" />
      <div className="p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <PaymentsTable payments={payments} onShow={handleShow} onEdit={handleEdit} />
        {selectedPayment && (
          isEditing ? (
            <EditPayment payment={selectedPayment} formData={formData} setFormData={setFormData} onCancel={handleClose} />
          ) : (
            <ShowPayment payment={selectedPayment} onClose={handleClose} onEdit={() => setIsEditing(true)} />
          )
        )}
      </div>
    </AppLayout>
  );
}
