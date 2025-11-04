import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import { Card, CardContent } from "@/Components/ui/card";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement, // ⬅️ needed for Pie
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement, // ⬅️ register ArcElement for Pie
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {
    const { stats, charts }: any = usePage().props;
    // Bar chart for payments per month
    const barData = {
        labels: Object.keys(charts.monthlyPayments).map((m) => `Month ${m}`),
        datasets: [
            {
                label: "Payments",
                data: Object.values(charts.monthlyPayments),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
        ],
    };

    // Pie chart for plan types
    const pieData = {
        labels: Object.keys(charts.plans),
        datasets: [
            {
                label: "Plans",
                data: Object.values(charts.plans),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                ],
            },
        ],
    };
    // Detect Tailwind dark mode
    const isDark = document.documentElement.classList.contains("dark");

    const chartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: isDark ? "#e5e7eb" : "#111827", // gray-200 / gray-900
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: isDark ? "#e5e7eb" : "#111827",
                },
                grid: {
                    color: isDark ? "#374151" : "#e5e7eb", // gray-700 / gray-200
                },
            },
            y: {
                ticks: {
                    color: isDark ? "#e5e7eb" : "#111827",
                },
                grid: {
                    color: isDark ? "#374151" : "#e5e7eb",
                },
            },
        },
    };

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                Total Members
                            </h2>
                            <p className="text-3xl text-gray-800 dark:text-gray-200">
                                {stats.totalMembers}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                Total Payments
                            </h2>
                            <p className="text-3xl text-gray-800 dark:text-gray-200">
                                {stats.totalPayments} DH
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                            Monthly Payments
                        </h2>
                        <Bar data={barData}     />
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                            Plans Distribution
                        </h2>
                        <Pie data={pieData} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
