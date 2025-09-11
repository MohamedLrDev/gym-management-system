<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Member;
use App\Models\Payment;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // Get statistics from your existing models (matching your actual structure)
        $statistics = [
            'total_members' => Member::count(),
            // 'premium_members' => Member::where('membership_status', 'premium')->count(),
            // 'basic_members' => Member::where('membership_status', 'basic')->count(),
            // 'expiring_soon' => Member::whereNotNull('membership_end_date')
            //                        ->where('membership_end_date', '<=', Carbon::now()->addDays(30))
            //                        ->where('membership_end_date', '>=', Carbon::now())
            //                        ->count(),
            'total_payments' => Payment::sum('amount'), // Adjust field name if different
            'monthly_revenue' => Payment::whereMonth('created_at', Carbon::now()->month)
                                     ->whereYear('created_at', Carbon::now()->year)
                                     ->sum('amount'),
            'recent_members' => Member::latest()->take(5)->get(),
            'recent_payments' => Payment::with('member')->latest()->take(5)->get(),
        ];

        return Inertia::render('Dashboard', [
            'statistics' => $statistics
        ]);
    }
}