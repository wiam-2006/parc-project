<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;

    protected $table = 'menu_items';

    protected $fillable = [
        'name',
        'description',
        'price',
        'category',
        'image',
        'available',
        'order',
    ];

    protected $casts = [
        'available' => 'boolean',
        'order' => 'integer',
    ];
}