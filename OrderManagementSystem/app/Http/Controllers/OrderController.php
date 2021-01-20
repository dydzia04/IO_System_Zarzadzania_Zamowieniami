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

    public function getAllOrders()
    {
        try {
            $orders = Order::with(["customer:NIP,id", "status"])->get();
            return response()->json($orders, 200);
        } catch (Exception $e) {
            return response()->json(['error' =>  $e], 500);
        }
    }

    public function getOrderById($id)
    {
        try {
            $order = Order::find($id);
            if ($order === null)
                return response()->json(['info' => "Order with " . $id . " does not exist in database."], 422);
            $order = $order->load(['customer:id,NIP,name', 'status', 'products']);
            return response()->json($order, 200);
        } catch (Exception $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        }
    }

    public function postCreateOrder(Request $request)
    {
        // products
        // date if date specified create order for date
        try {
            $customer = $request->validate(['customer.nip' => 'required|string']);

            DB::beginTransaction();
            $customer = Customer::where('nip', $request['customer']['nip'])->first();

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
                $date = Carbon::parse($date);

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
                    'products.*.netPrice' => 'required|numeric|min:0'
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
                        'vatRate' => 'required|numeric|min:1',
                        'measureUnit' => 'required|string',
                        'isService' => 'required|boolean'
                    ]);
                    $productDB = $productDB->create($validator->validate());
                }
                $orderDetails = ['quantity' => $product['quantity'], 'netPrice' => $product['netPrice']];

                $details = ['quantity' => $product['quantity'], 'netPrice' => $product['netPrice']];

                $order->products()->attach($productDB->id, $details);
            }

            DB::commit();
            return response()->json($order, 201);
        } catch (PDOException $e) {
            DB::rollback();
            return response()->json(['errors' => ['title' => "Database problem", 'detail' => $e->getMessage()]], 500);
        } catch (ValidationException $e) {
            DB::rollback();
            return response()->json(['errors' => ['title' => $e->getMessage(), 'detail' => $e->errors()]], 422);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['errors' => $e], 500);
        }
    }

    public function deleteOrder($id)
    {
        try {
            $order = Order::find($id);
            if ($order === null)
                return response()->json(['info' => "Order with " . $id . " does not exist in database."], 422);
            $order->delete();
            return response()->json(['deleted' => $order], 200);
        } catch (Exception $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        }
    }

    public function putUpdateOrder(Request $request, $id)
    {
        try {
            DB::beginTransaction();
            $order = Order::find($id);
            if ($order === null)
                return response()->json(['errors' => ['title' => 'Invalid order id', 'detail' => 'Order identified by id: "' . $id . '" doesn\'t exist in database.']], 422);

            // validating products required data
            $productRequired = $request->validate(
                [
                    'products' => 'required|array',
                    'products.*.product_id' => 'required|integer',
                    'products.*.quantity' => 'required|numeric|min:1',
                    'products.*.netPrice' => 'required|numeric|min:0',
                    'status_id' => 'required|exists:order_status,id'
                ]
            );

            //removing all products associated with order
            $order->products()->detach();
            $order->status_id = $request['status_id'];

            foreach ($request['products'] as $product) {

                $productDB = Product::where('product_id', $product['product_id'])->first();

                // create product if does not exists
                // we don't need to give additional information about product if he exists in database
                if ($productDB === null) {
                    $productDB = new Product();

                    $validator = Validator::make($product, [
                        'product_id' => 'required|integer',
                        'name' => 'required|string',
                        'vatRate' => 'required|numeric|min:1',
                        'measureUnit' => 'required|string',
                        'isService' => 'required|boolean',
                    ]);
                    $productDB = $productDB->create($validator->validate());
                }
                $orderDetails = ['quantity' => $product['quantity'], 'netPrice' => $product['netPrice']];

                $details = ['quantity' => $product['quantity'], 'netPrice' => $product['netPrice']];

                $order->products()->attach($productDB->id, $details);
            }

            $order->save();
            DB::commit();
            return response()->json(['updated' => $order->load(['customer', 'products'])], 200);
        } catch (ValidationException $e) {
            DB::rollback();
            return response()->json(['errors' => ['title' => $e->getMessage(), 'detail' => $e->errors()]], 422);
        } catch (PDOException $e) {
            DB::rollback();
            return response()->json(['errors' => ['title' => "Database problem", 'detail' => $e->getMessage()]], 500);
        } catch (Exception $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        }
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
