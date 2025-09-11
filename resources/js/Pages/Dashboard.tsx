import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-lg font-semibold">Active Members</h2>
                    <p className="text-3xl mt-2">120</p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-lg font-semibold">Payments This Month</h2>
                    <p className="text-3xl mt-2">15,000 MAD</p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-lg font-semibold">Expired Memberships</h2>
                    <p className="text-3xl mt-2">8</p>
                </div>
            </div>
        </AppLayout>
    );
}
