<?php

namespace Database\Seeders;


use App\Models\Member;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class MembersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Member::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '123-456-7890',
            'membership_status' => 'active',
            'membership_end_date' => Carbon::now()->addYear(),
        ]);


    
         Member::create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'phone' => '987654321',
            'membership_status' => 'inactive',
            'membership_end_date' => Carbon::now()->addYear(),
        ]);
    }
}
