<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 180);
            $table->string('slug', 200)->unique();
            $table->string('category', 80)->index();
            $table->text('description')->nullable();
            $table->unsignedInteger('price_mwk');
            $table->enum('stock_status', ['in_stock', 'low_stock', 'out_of_stock'])->default('in_stock')->index();
            $table->unsignedInteger('stock_quantity')->default(0);
            $table->string('image_url', 500)->nullable();
            $table->string('source_url', 500)->nullable();
            $table->string('source_note', 500)->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
