<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public $table = 'products';

    public $timestamps = false;

    protected $fillable = [
        'product_id',
        'name',
        // 'price', moved to pivot table (Not every customer have same price, vatRate stays same for product)
        'vatRate',
        'measureUnit',
        'isService'
    ];

    // public function orders()
    // {
    //     return $this->belongsToMany(Order::class)->withPivot('quantity');
    // }
}
