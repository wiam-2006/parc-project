<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membership extends Model
{
    use HasFactory;

    protected $table = 'memberships';

    protected $fillable = [
        'membership_id',
        'package',
        'duration_months',
        'first_name',
        'last_name',
        'cin',
        'phone',
        'email',
        'payment_status',
        'payment_method',
        'card_holder_name',
        'card_last4',
        'total_price',
        'start_date',
        'expiration_date',
    ];

    protected $casts = [
        'duration_months' => 'integer',
        'total_price' => 'decimal:2',
        'start_date' => 'date',
        'expiration_date' => 'date',
    ];
}
