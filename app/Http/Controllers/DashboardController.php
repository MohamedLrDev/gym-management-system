<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Payment;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Stats
        $totalMembers = Member::count();
        $totalPayments = Payment::sum('amount');
        $plans = Payment::selectRaw('plan_type, COUNT(*) as count')
            ->groupBy('plan_type')
            ->pluck('count', 'plan_type');

        // Payments per month
        $monthlyPayments = Payment::selectRaw('MONTH(start_date) as month, SUM(amount) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('total', 'month');

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalMembers' => $totalMembers,
                'totalPayments' => $totalPayments,
            ],
            'charts' => [
                'monthlyPayments' => $monthlyPayments,
                'plans' => $plans,
            ],
        ]);
    }
}
