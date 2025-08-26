<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\Models\Member;

class Payment extends Model
{
    
    use HasFactory;

    protected $fillable = [
        'member_id',
        'plan_type',
        'amount',
        'start_date',
        'end_date',
    ];


    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    // Automatically set end_date based on plan_type and start_date
     protected static function booted()
    {
        static::creating(function ($payment) {
            if ($payment->plan_type === 'monthly') {
                $payment->end_date = Carbon::parse($payment->start_date)->addDays(30);
            } elseif ($payment->plan_type === 'yearly') {
                $payment->end_date = Carbon::parse($payment->start_date)->addYear();
            }
        });
    }
}

