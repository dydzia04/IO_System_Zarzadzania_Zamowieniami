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
use App\Models\Status;
use PDOException;

class OrderController extends Controller
{

    public function getOrder($id)
    {
        $order = Order::findOrFail($id);

        $order = $order->load(['customer', 'products', 'status']);

        return response()->json($order, 200);
    }

    public function getAllOrders()
    {
        $orders = Order::with(["customer:NIP,id", "status"])->get();

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

    public function getAllStatus()
    {
        $all = Status::all();
        return response()->json($all, 200);
    }

    public function changeStatus(Request $request, $id)
    {
        $order = Order::firstWhere('id', $id);

        if ($order === null)
            return response()->json(['errors' => ['title' => 'Invalid order id', 'detail' => 'Order identified by id: "' . $id . '}" doesn\'t exist in database.']], 422);
        try {
            $status = $request->validate(['status_id' => 'required|exists:order_status,id']);
        } catch (ValidationException $e) {
            return response()->json(['errors' => ['title' => $e->getMessage(), 'detail' => $e->errors()]], 422);
        }
        $order->status_id = $status["status_id"];
        $order->save();

        return response()->json(['updated' => $order], 200);
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
            $details = ['quantity' => $product['quantity'], 'discountedPrice' => isset($product['discountedPrice']) ? $product['discountedPrice'] : null];

            $order->products()->attach($productDB->id, $details);
        }

        $order->save();

        return response()->json(['updated' => $order->load(['customer', 'products'])], 200);

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
        try {
            DB::beginTransaction();
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
                        'customer.address' => 'required|string'
                    ]
                );
                $customer = $customer->create($customerValidated['customer']);
            }

            $date = $request['date'];

            if ($date === null)
                $date = Carbon::now();
            else
                $date = new Carbon("10.12.2020 16:12:18");

            // Creating new Order
            $order = new Order();
            $order->created_at = $date;
            $order->order_name = $this->generateOrderName($date->setHour(0)->setMinute(0)->setSecond(0));
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
                $orderDetails = ['quantity' => $product['quantity'], 'discountedPrice' => isset($product['discountedPrice']) ? $product['discountedPrice'] : null];

                $details = ['quantity' => $product['quantity'], 'discountedPrice' => isset($product['discountedPrice']) ? $product['discountedPrice'] : null];

                $order->products()->attach($productDB->id, $details);
            }

            DB::commit();
            return response()->json(['created' => $order->load(['customer', 'products'])], 201);
        } catch (PDOException $e) {
            return response()->json(['errors' => ['title' => "Database connection problem", 'detail' => $e->getMessage()]], 500);
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

    private function generateOrderName($carbonDate)
    {
        $date  = $carbonDate->year . '/' . $carbonDate->month . '/' . $carbonDate->day;

        $order = Order::whereDate('created_at', $carbonDate)->get();
        $orderNum = count($order) + 1;

        $name = 'ZM/' . $date . '/NR/' . $orderNum;
        return $name;
    }
}
