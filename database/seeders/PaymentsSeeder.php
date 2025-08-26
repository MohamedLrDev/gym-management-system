<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Payment;
use App\Models\Member;
use Carbon\Carbon;

class PaymentsSeeder extends Seeder
{
    public function run(): void
    {
        $member = Member::first(); // attach payment to first member

        Payment::create([
            'member_id' => $member->id,
            'plan_type' => 'monthly',
            'amount' => 50.00,
            'start_date' => Carbon::now(),
            'end_date' => Carbon::now()->addMonth(),
        ]);
    }
}
