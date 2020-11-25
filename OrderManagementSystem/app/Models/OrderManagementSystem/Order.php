<?php

namespace App\Models\OrderManagementSystem;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_name',
        'status_id',
        'customer_id',
        'created',
        'last_modified'
    ];
    

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        
    ];

    public function status(): HasOne
    {
        return $this->hasOne(Order_Status::class);
    }

    public function details(): HasMany
    {
        return $this->hasMany(Order_Details::class);
    }

    public function customer(): HasOne
    {
        return $this->hasOne(Customer::class,'id');
    }
}
