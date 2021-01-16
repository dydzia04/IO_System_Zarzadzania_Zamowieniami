<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Exception;

class CustomerController extends Controller
{
    public function getAllCustomers()
    {
        try {
            $all = Customer::all();
            return response()->json($all, 200);
        } catch (Exception $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        }
    }

    public function getCustomerByNIP($nip)
    {
        try {
            $customer = Customer::firstWhere('nip', $nip);
            $customer = $customer->load(['orders']);
            return response()->json($customer, 200);
        } catch (Exception $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        }
    }
}
