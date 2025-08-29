<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Member;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;

class PaymentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::with('member')->get();
        return Inertia::render('Payments/Index', ['payments' => $payments]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $members = Member::all();
        return Inertia::render('Payments/Create', ['members' => $members]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'member_id' => 'required|exists:members,id',
            'plan_type' => 'required|in:monthly,yearly',
            'amount' => 'required|numeric|min:0',
            'start_date' => 'required|date',
        ]);

        $start = Carbon::parse($validated['start_date']);
        $end = $validated['plan_type'] === 'monthly'
            ? $start->copy()->addMonth()
            : $start->copy()->addYear();

        $payment = Payment::create([
            'member_id'  => $validated['member_id'],
            'plan_type'  => $validated['plan_type'],
            'amount'     => $validated['amount'],
            'start_date' => $start->format('Y-m-d'),
            'end_date'   => $end->format('Y-m-d'),
        ]);

        $member = Member::findOrFail($validated['member_id']);
        $member->membership_end_date = $end->format('Y-m-d');
        $member->membership_status = 'active';
        $member->save();

        return redirect()->route('members.show', $member->id)
            ->with('success', 'Payment added and membership updated successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        $payment->load('member');
        return Inertia::render('Payments/Show', ['payment' => $payment]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        $members = Member::all();
        return Inertia::render('Payments/Edit', [
            'payment' => $payment->load('member'),
            'members' => $members
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'member_id'  => 'sometimes|required|exists:members,id',
            'plan_type'  => 'sometimes|required|in:monthly,yearly',
            'amount'     => 'sometimes|required|numeric|min:0',
            'start_date' => 'sometimes|required|date',
        ]);

        if (isset($validated['plan_type']) || isset($validated['start_date'])) {
            $start = isset($validated['start_date'])
                ? Carbon::parse($validated['start_date'])
                : Carbon::parse($payment->start_date);

            $planType = $validated['plan_type'] ?? $payment->plan_type;

            $validated['end_date'] = $planType === 'monthly'
                ? $start->copy()->addMonth()->format('Y-m-d')
                : $start->copy()->addYear()->format('Y-m-d');

            $validated['start_date'] = $start->format('Y-m-d');
        }

        $payment->update($validated);

        $member = $payment->member;
        if ($member) {
            $member->membership_end_date = $payment->end_date;
            $member->membership_status = 'active';
            $member->save();
        }

        return redirect()->route('members.show', $payment->member_id)
            ->with('success', 'Payment and membership updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $member = $payment->member;
        $payment->delete();

        if ($member) {
            $lastPayment = $member->payments()->latest('end_date')->first();

            if ($lastPayment) {
                $member->membership_end_date = $lastPayment->end_date;
                $member->membership_status = 'active';
            } else {
                $member->membership_end_date = null;
                $member->membership_status = 'inactive';
            }

            $member->save();
        }

        return redirect()->route('members.show', $member->id)
            ->with('success', 'Payment deleted and membership updated successfully');
    }
}
