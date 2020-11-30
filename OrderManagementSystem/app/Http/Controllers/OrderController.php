<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;

use App\Models\Order;
use App\Models\Customer;
use App\Models\Product;

class OrderController extends Controller
{

    public function getOrder($id)
    {
        $order = Order::findOrFail($id);

        $order = $order->load(['customer', 'products']);

        return response()->json($order, 200);
    }

    public function getAllOrders()
    {
        $orders = Order::all();

        return response()->json($orders, 200);
    }

    public function getForCustomer($nip)
    {
        $customer = Customer::firstWhere('nip', $nip);

        if ($customer === null)
            return response()->json(['errors' => ['title' => 'Invalid customer nip.', 'detail' => 'Customer identified by nip: "' . $nip . '" doesn\'t exist in database.']], 422);

        $orders = Order::where('customer_id', $customer->id)->get()->load(['products']);

        return response()->json($orders, 200);
    }

    public function updateOrder(Request $request, $id)
    {
        // DB::beginTransaction();
        // try {
            $order = Order::firstWhere('id', $id);

            if ($order === null)
                return response()->json(['errors' => ['title' => 'Invalid order id', 'detail' => 'Order identified by id: "' . $id . '}" doesn\'t exist in database.']], 422);

            $productRequired = $request->validate(
                [
                    'products' => 'required|array',
                    'products.*.product_id' => 'required|integer',
                    'products.*.quantity' => 'required|numeric|min:1',
                ]
            );

            //removing all products associated with order
            $order->products()->detach();

            foreach ($request['products'] as $product) {

                $productDB = Product::where('product_id', $product['product_id'])->first();

                // create product if does not exists
                // we don't need to give additional information about product if he exists in database
                if ($productDB === null) {
                    $productDB = new Product();

                    $validator = Validator::make($product, [
                        'product_id' => 'required|integer',
                        'name' => 'required|string',
                        'price' => 'required|numeric|between:0,99999999.99',
                        'description' => 'required|string',
                        'isService' => 'required|boolean'
                    ]);

                    $productDB = $productDB->create($validator->validate());
                }

                $order->products()->attach($productDB->id, ['quantity' => $product['quantity']]);
            }

            $order->save();
            
            return response()->json(['updated' => $order->load(['products'])], 200);

        // } catch (ValidationException $e) {
        //     DB::rollback();
        //     return response()->json(['errors' => ['title' => $e->getMessage(), 'detail' => $e->errors()]], 422);
        // } catch (Exception $e) {
        //     DB::rollback();
        //     return response()->json(['errors' => $e], 500);
        // }



        // $order = $order->update($request->all());

        // return response()->json(['updated' => $order], 200);
    }

    public function createOrder(Request $request)
    {
        DB::beginTransaction();
        try {
            $customer = Customer::firstWhere('nip', $request['customer']['nip']);

            if ($customer === null) // customer does not exists, create
            {
                $customer = new Customer();

                $customerValidated = $request->validate(
                    [
                        'customer.nip' => 'required|string',
                        'customer.name' => 'required|string',
                        'customer.contact_name' => 'required|string',
                        'customer.contact_surname' => 'required|string',
                        'customer.email' => 'required|email',
                        'customer.phone' => 'required|string',
                        'customer.address' => 'required|string',
                        'customer.discount' => 'required|numeric|between:0,100.00'
                    ]
                );
                $customer = $customer->create($customerValidated['customer']);
            }

            // Creating new Order
            $order = new Order();
            $order->order_name = $this->generateOrderName();
            $order->status_id = 1;
            $order->customer_id = $customer->id;
            $order->save();

            // validating products required data
            $productRequired = $request->validate(
                [
                    'products' => 'required|array',
                    'products.*.product_id' => 'required|integer',
                    'products.*.quantity' => 'required|numeric|min:1',
                ]
            );

            foreach ($request['products'] as $product) {

                $productDB = Product::where('product_id', $product['product_id'])->first();

                // create product if does not exists
                // we don't need to give additional information about product if he exists in database
                if ($productDB === null) {
                    $productDB = new Product();

                    $validator = Validator::make($product, [
                        'product_id' => 'required|integer',
                        'name' => 'required|string',
                        'price' => 'required|numeric|between:0,99999999.99',
                        'description' => 'required|string',
                        'isService' => 'required|boolean'
                    ]);

                    $productDB = $productDB->create($validator->validate());
                }

                $order->products()->attach($productDB->id, ['quantity' => $product['quantity']]);
            }

            DB::commit();
            return response()->json(['created' => $order->load(['customer', 'products'])], 201);
        } catch (ValidationException $e) {
            DB::rollback();
            return response()->json(['errors' => ['title' => $e->getMessage(), 'detail' => $e->errors()]], 422);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['errors' => $e], 500);
        }
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
