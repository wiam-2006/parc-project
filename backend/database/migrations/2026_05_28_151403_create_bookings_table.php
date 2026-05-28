<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->foreignId('activity_id')->nullable()->constrained()->onDelete('set null');
            $table->string('street')->nullable();
            $table->string('city')->nullable();
            $table->string('postal_code')->nullable();
            $table->date('booking_date');
            $table->string('booking_time');
            $table->integer('adults')->default(1);
            $table->integer('children')->default(0);
            $table->decimal('adult_price', 8, 2)->nullable();
            $table->decimal('child_price', 8, 2)->nullable();
            $table->decimal('total_price', 8, 2);
            $table->string('payment_method')->default('online'); // online, local
            $table->string('payment_status')->default('pending'); // pending, paid, unpaid
            $table->string('status')->default('pending'); // pending, confirmed, cancelled
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};