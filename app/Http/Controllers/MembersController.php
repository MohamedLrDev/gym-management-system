<?php

namespace App\Http\Controllers;

use App\Models\Member;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MembersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $members = Member::all();
        return Inertia::render('Members/Index', [
            'members' => $members
        ]);
        // return response()->json($members);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members,email',
            'phone' => 'nullable|string|max:20',
            'membership_status' => 'required|string',
            'membership_end_date' => 'required|date',
        ]);
        // Create member
        $member = Member::create($validated);

        return response()->json([
            'message' => 'Member created successfully',
            'member' => $member
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Member $members)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Member $members)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Member $members)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members,email',
            'phone' => 'nullable|string|max:20',
            'membership_status' => 'required|string',
            'membership_end_date' => 'required|date',
        ]);
        // Update member
        $members->update($validated);

        return response()->json([
            'message' => 'Member updated successfully',
            'member' => $members
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $members)
    {
        $members->delete();

        return response()->json([
            'message' => 'Member deleted successfully'
        ]);
    }
}
