<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('memberships', function (Blueprint $table) {
            $table->id();
            $table->string('membership_id')->unique();
            $table->string('package');
            $table->integer('duration_months');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('cin');
            $table->string('phone');
            $table->string('email');
            $table->string('payment_status');
            $table->string('payment_method')->default('card');
            $table->string('card_holder_name');
            $table->string('card_last4', 4);
            $table->decimal('total_price', 10, 2);
            $table->date('start_date');
            $table->date('expiration_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('memberships');
    }
};
