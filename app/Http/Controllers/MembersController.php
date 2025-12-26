<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MembersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // No need to eager load payments yet unless you plan to show them
        $members = Member::with('payments')->get();

        return Inertia::render('Members/Index', [
            'members' => $members
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Members/CreateMember');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:members,email',
            'phone' => 'nullable|string|max:20',
        ]);

        // Create member
        Member::create($validated);

        return redirect()->route('members.index')
            ->with('success', 'Member created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Member $member)
    {
        // later you can load payments if needed
        return Inertia::render('Members/ShowMember', [
            'member' => $member
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Member $member)
    {
        return Inertia::render('Members/EditMember', [
            'member' => $member
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('members', 'email')->ignore($member->id),
            ],
            'phone' => 'nullable|string|max:20',
        ]);

        // Update member
        $member->update($validated);

        return redirect()->route('members.index')
            ->with('success', 'Member updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        $member->delete();

        return redirect()->route('members.index')
            ->with('success', 'Member deleted successfully!');
    }

    /**
     * Get all memberships that will expire within the next 7 days.
     * Used for admin notifications.
     */
    // public function getExpiringMemberships()
    // {
    //     $today = Carbon::today();
    //     $limitDate = $today->copy()->addDays(7);

    //     // Get latest payment per member that expires within 7 days
    //     $expiring = Payment::with('member')
    //         ->whereBetween('end_date', [$today, $limitDate])
    //         ->orderBy('end_date', 'asc')
    //         ->get()
    //         ->map(function ($payment) use ($today) {
    //             $daysLeft = $today->diffInDays(Carbon::parse($payment->end_date), false);

    //             return [
    //                 'member_id'   => $payment->member->id,
    //                 'member_name' => $payment->member->name,
    //                 'plan_type'   => ucfirst($payment->plan_type),
    //                 'end_date'    => $payment->end_date->format('Y-m-d'),
    //                 'days_left'   => $daysLeft,
    //             ];
    //         });

    //     return response()->json([
    //         'count' => $expiring->count(),
    //         'memberships' => $expiring
    //     ]);
    // }

    // ... your existing CRUD methods ...

    /**
     * Return all memberships expiring within 7 days as JSON
     */
    public function getExpiringMemberships()
    {
        $today = Carbon::today();
        $nextWeek = Carbon::today()->addDays(7);

        // Get latest payment per member within next 7 days
        $expiring = Payment::with('member')
            ->whereBetween('end_date', [$today, $nextWeek])
            ->orderBy('end_date', 'asc')
            ->get()
            ->map(function ($payment) use ($today) {
                return [
                    'member_id'   => $payment->member->id,
                    'member_name' => $payment->member->name,
                    'email'       => $payment->member->email,
                    'plan_type'   => ucfirst($payment->plan_type),
                    'end_date'    => $payment->end_date->format('Y-m-d'),
                    'days_left'   => $today->diffInDays(Carbon::parse($payment->end_date), false),
                ];
            });

        return response()->json([
            'count' => $expiring->count(),
            'memberships' => $expiring
        ]);
    }
}


