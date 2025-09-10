<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Payment;
use App\Models\Member;
use Faker\Factory as Faker;
use Carbon\Carbon;

class PaymentsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            $member = Member::inRandomOrder()->first();

            $startDate = Carbon::now()->subDays(rand(0, 365));
            $endDate = (clone $startDate)->addDays(rand(30, 365));

            Payment::create([
                'member_id' => $member->id,
                'plan_type' => $faker->randomElement(['monthly', 'yearly']),
                'amount' => $faker->randomElement([100.00, 250.00, 500.00, 1200.00]),
                'start_date' => $startDate->toDateString(),
                'end_date' => $endDate->toDateString(),
            ]);
        }
    }
}
