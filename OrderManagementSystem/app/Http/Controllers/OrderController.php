<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Exception;

use App\Models\Order;
use App\Models\Customer;
use App\Models\Product;

class OrderController extends Controller
{

    public function getOrder($id)
    {
        $order = Order::findOrFail($id);
        $order = $order->load(['products']);

        return response()->json($order, 200);
    }

    public function getAllOrders()
    {
        $orders = Order::all();

        return response()->json($orders->load(['products']), 200);
    }

    public function getForCustomer($nip)
    {

        $customer = new Customer();
        $customer = $customer->where('nip', $nip)->first();

        if ($customer === null)
            return response()->status(422);

        $orders = new Order();
        $orders = $orders->where('customer_id', $customer->id)->get();

        return response()->json($orders, 200);
    }

    public function patchOrder(Request $request, $id)
    {
        $order = new Order();
        $order = $order->where('id', $id)->first();

        if ($order === null)
            return response()->status(422);

        $order = $order->update($request->all());

        return response()->json(['updated' => $order], 200);
    }

    //create order
    public function createOrder(Request $request)
    {
        DB::beginTransaction();
        try {
            $customerRequestData = $request->get('customer');

            $customer = Customer::firstWhere('nip', $customerRequestData['nip']);

            if ($customer === null) // customer does not exists, create
            {
                $customer = new Customer();

                $customer = $customer->create($customerRequestData);
            }

            //Creating new Order
            $order = new Order(); 
            $order->order_name = $this->generateOrderName();
            $order->status_id = 1;
            $order->customer_id = $customer->id;
            $order->save(); 

            foreach ($request['products'] as $product) {
                $productDB = Product::find($product['id']);
                
                if ($productDB === null) //product does not exists, create
                {
                    $productDB = new Product();
                    $productDB = $productDB->create([
                        'product_id' => $product['id'],
                        'name' => $product['name'],
                        'price' => $product['price'],
                        'description' => $product['description'],
                        'isService' => $product['isService']
                    ]);
                }
                //attaching product to order
                $order->products()->attach($productDB->id, ['quantity' => $product['quantity']]);
            }

            DB::commit();

            return response()->json($order->load(['products']), 201);

        } catch (Exception $e) {
            DB::rollback();

            return response()->json(["Exception"=>$e], 500);
        }
    }

    //update order product list
    public function updateProductList(Request $request, $id)
    {
        // $request jako tablica produktów
        // Podajemy listę produktów i chuj.
        // v1
        $order = new Order();
        $order = $order->find($id);
        $order->products()->sync($request);

        //syncWithoutDetaching([$id_one, $id_two, $id_three]);

        // v2
        // $order = new Order();
        // associate
        // $order = $order->find($id)->with(['products']);

        $order->save();

        return response()->json($order, 200);
    }

    //remove order
    public function removeOrder($id)
    {
        $order = Order::find($id);
        $order->delete();
        return response()->json(['deleted' => $order], 200);
    }

    private function generateOrderName()
    {
        $date  = date('Y') . '/' . date('m') . '/' . date('j');

        $order = Order::whereDate('created_at', Carbon::today())->get();
        $orderNum = count($order) + 1;

        $name = "ZM/" . $date . '/NR/' . $orderNum;
        return $name;
    }
}
