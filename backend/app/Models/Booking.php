<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'activity_id',
        'street',
        'city',
        'postal_code',
        'booking_date',
        'booking_time',
        'adults',
        'children',
        'adult_price',
        'child_price',
        'total_price',
        'payment_method',
        'payment_status',
        'status'
    ];
}