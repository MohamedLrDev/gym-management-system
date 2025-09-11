import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function About() {
    return (
        <AppLayout>
            <Head title="About Us" />
            <h1 className="text-2xl font-bold mb-4">About Us</h1>
            <p>Welcome to our Gym Management System 🚀</p>
        </AppLayout>
    );
}
