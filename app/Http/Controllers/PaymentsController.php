<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all payments with related member
        $payments = Payment::with('member')->get();
        return response()->json($payments);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'member_id' => 'required|exists:members,id',
            'plan_type' => 'required|in:monthly,yearly',
            'amount' => 'required|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

         // Calculate end_date automatically based on plan_type
        $start = Carbon::parse($validated['start_date']);
        $end = $validated['plan_type'] === 'monthly' ? $start->addMonth() : $start->addYear();

        $payment = Payment::create([
            'member_id' => $validated['member_id'],
            'plan_type' => $validated['plan_type'],
            'amount' => $validated['amount'],
            'start_date' => $start->format('Y-m-d'),
            'end_date' => $end->format('Y-m-d'),
        ]);

        return response()->json([
            'message' => 'Payment created successfully',
            'payment' => $payment
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        //Include member info
        $payment->load('member');
        return response()->json($payment);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'member_id' => 'sometimes|required|exists:members,id',
            'plan_type' => 'sometimes|required|in:monthly,yearly',
            'amount' => 'sometimes|required|numeric|min:0',
            'start_date' => 'sometimes|required|date',
        ]);

        // If plan_type or start_date is updated, recalculate end_date
        if(isset($validated['plan_type']) || isset($validated['start_date'])){
            $start = isset($validated['start_date']) ? Carbon::parse($validated['start_date']) : Carbon::parse($payment->start_date);
            $planType = $validated['plan_type'] ?? $payment->plan_type;
            $validated['end_date'] = $planType === 'monthly' ? $start->addMonth()->format('Y-m-d') : $start->addYear()->format('Y-m-d');
            $validated['start_date'] = $start->format('Y-m-d');
        }

        $payment->update($validated);

        return response()->json([
            'message' => 'Payment updated successfully',
            'payment' => $payment
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();
        return response()->json([
            'message' => 'Payment deleted successfully'
        ]);
    }
}
