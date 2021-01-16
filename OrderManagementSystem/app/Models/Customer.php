<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \DateTimeInterface;
use Status;

class Customer extends Model
{
    use HasFactory;

    public $table = 'customers';

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'nip',
        'name',
        'contact_name',
        'contact_surname',
        'email',
        'phone',
        'address'
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'customer_id', 'id')->with(Status::class);
    }
}
