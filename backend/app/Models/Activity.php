<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;
    protected $fillable = [
        'category',
        'bento_size',
        'title',
        'description',
        'image',
        'badge',
        'adult_price',
        'child_price',
        'age_range',
        'duration',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'adult_price' => 'decimal:2',
        'child_price' => 'decimal:2',
    ];

    protected $appends = ['image_url'];

    // ── Scopes ────────────────────────────────────────────
 
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
 
    public function scopeCategory($query, string $category)
    {
        return $query->where('category', $category);
    }
 
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }

    // ── Accessors ─────────────────────────────────────────
 
    // Returns full URL so React can use it directly
    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image) return null;

        if (str_starts_with($this->image, 'http')) return $this->image;

        return asset('storage/' . $this->image);
    }
}
