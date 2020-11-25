<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderManagementSystem\Order;
use App\Models\OrderManagementSystem\Customer;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller{

    public function getOrder($id)
    {
        $order = new Order();

        $order = $order->where('id',$id)->first();

        return response()->json($order,200);
    }

    public function getAllOrders()
    {
        $orders = Order::all();

        return response()->json($orders, 200);
    }

    public function getForCustomer($nip)
    {
        $customer = new Customer();
        $customer = $customer->where('nip',$nip)->first();
        return response()->json($customer, 200);

        $orders = new Order();
        $orders = $orders->where('customer_id',$customer->id)->get();
        
        return response()->json($orders, 200);
    }

    public function patchStatus(Request $request)
    {
        $validated = $request->validate(
            ['status_id' => 'exists:order_statuss,id',
            'order_id' => 'exists:orders,id']
        );

        $order = new Order();
        $order = $order->where('id',$validated['id'])->first();

        $order->status_id = $validated['status_id'];

        //metoda do zmiany daty modyfikacji
    }

    //create order
    public function createOrder(Request $request) 
    {

        return response()->json('createOrder', 201);
    }

    //update order product list
    public function updateProductList(Request $request, $id)
    {
        return response()->json('updateOrder', 200);
    }

    //remove order
    public function removeOrder(Request $request, $id)
    {
        return response()->json('deleteOrder', 200);
    }
}