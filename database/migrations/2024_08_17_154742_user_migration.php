<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_user', function (Blueprint $table) {
            $table->id();
            $table->string('nis', 6);
            $table->string('name');
            $table->string('email');
            $table->string('password');
            $table->enum('type', ['admin', 'member'])->default('member');
            $table->enum('verified', ['verified', 'unverified'])->default('unverified');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_user');
    }
};
