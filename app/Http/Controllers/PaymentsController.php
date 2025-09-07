<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Member;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PaymentsController extends Controller
{
    /**
     * Show all payments with their members.
     */
    public function index()
    {
        $payments = Payment::with('member')->latest()->get();

        return inertia('Payments/Index', [
            'payments' => $payments,
        ]);
    }

    /**
     * Store a newly created payment for a member.
     */
    public function store(Request $request)
    {
        $validated = $this->validatePayment($request);

        // Generate start/end dates
        $startDate = Carbon::parse($validated['start_date']);
        $endDate   = $this->calculateEndDate($startDate, $validated['plan_type']);

        Payment::create([
            'member_id'  => $validated['member_id'],
            'plan_type'  => $validated['plan_type'],
            'amount'     => $validated['amount'],
            'start_date' => $startDate->toDateString(),
            'end_date'   => $endDate->toDateString(),
        ]);

        return redirect()
            ->route('members.index')
            ->with('success', 'Payment added successfully.');
    }

    /**
     * Display the specified payment.
     */
    public function show(Payment $payment)
    {
        $payment->load('member');

        return inertia('Payments/Show', [
            'payment' => $payment,
        ]);
    }

    public function edit(Payment $payment)
    {
        return inertia('Payments/Edit', [
            'payment' => $payment,
        ]);
    }
    /**
     * Update the specified payment.
     */
    public function update(Request $request, Payment $payment)
    {
        $validated = $this->validatePayment($request);

        $startDate = Carbon::parse($validated['start_date']);
        $endDate   = $this->calculateEndDate($startDate, $validated['plan_type']);

        $payment->update([
            'plan_type'  => $validated['plan_type'],
            'amount'     => $validated['amount'],
            'start_date' => $startDate->toDateString(),
            'end_date'   => $endDate->toDateString(),
        ]);

        return redirect()
            ->route('members.index')
            ->with('success', 'Payment updated successfully.');
    }

    /**
     * Remove the specified payment.
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();

        return back()->with('success', 'Payment deleted successfully.');
    }

    /* ------------------------- 🔹 Private Helpers ------------------------- */

    /**
     * Validate request data for payments.
     */
    private function validatePayment(Request $request): array
    {
        return $request->validate([
            'member_id'  => 'required|exists:members,id',
            'plan_type'  => 'required|in:monthly,yearly',
            'amount'     => 'required|numeric|min:0',
            'start_date' => 'required|date',
        ]);
    }

    /**
     * Calculate end date based on plan type.
     */
    private function calculateEndDate(Carbon $startDate, string $planType): Carbon
    {
        return $planType === 'monthly'
            ? $startDate->copy()->addDays(30)
            : $startDate->copy()->addDays(365);
    }
}
