<?php

namespace App\Models\OrderManagementSystem;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nip',
        'name',
        'contact_name',
        'contact_surname',
        'email',
        'phone',
        'address',
        'created_at',
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

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
