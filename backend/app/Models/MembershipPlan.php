<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MembershipPlan extends Model
{
    use HasFactory;

    protected $table = 'membership_plans';

    protected $fillable = [
        'name',
        'price',
        'features',
        'is_popular',
        'btn_text',
        'order',
        'active',
    ];

    protected $casts = [
        'features'   => 'array',
        'is_popular' => 'boolean',
        'active'     => 'boolean',
        'order'      => 'integer',
    ];
}
