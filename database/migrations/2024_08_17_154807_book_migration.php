<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_books_detail', function (Blueprint $table) {
            $table->id('inventory_id')->unique();
            $table->string('isbn', 13);
            $table->string('title', 50);
            $table->string('author', 50);
            $table->text('synopsis');
            $table->string('language', 20);
            $table->string('location', 20);
            $table->timestamps();
        });

        Schema::create('tb_books_filter', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement()->primary();
            $table->string('status', 10);
        });

        Schema::create('tb_books_catalog', function (Blueprint $table) {
            $table->id('catalog_id');
            $table->unsignedBigInteger('inventory_id')->unique();
            $table->unsignedInteger('status');
            $table->string('user', 45)->nullable();
            $table->timestamps();

            $table->foreign('inventory_id')->references('inventory_id')->on('tb_books_detail')->onDelete('cascade');
            $table->foreign('status')->references('id')->on('tb_books_filter');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_books_detail');
        Schema::dropIfExists('tb_books_catalog');
    }
};
