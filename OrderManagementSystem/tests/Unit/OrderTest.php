<?php

namespace Tests\Unit;

use App\Models\Customer;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Carbon\Carbon;
use Illuminate\Testing\TestResponse;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    public function testCreateOrder()
    {
        $this->seed();

        $response = $this->json('POST', '/api/orders', $this->orderJson());
        $response->assertStatus(201);
        return $response;
    }

    public function testCreateOrderWithoutSeededDb()
    {
        $response = $this->json('POST', '/api/orders', $this->orderJson());
        $response->assertStatus(500);
    }

    public function testCreateOrderWithDate()
    {
        $this->seed();

        $order = $this->orderJson();
        $order["date"] = "10.12.2020 16:12:18";

        $response = $this->json('POST', '/api/orders', $order);
        $response->assertStatus(201);
    }

    public function testCreateOrderMissingData()
    {
        $this->seed();

        $response = $this->json('POST', '/api/orders');
        $response->assertStatus(422);
    }

    public function testGetOrders()
    {
        $this->testCreateOrder();

        $response = $this->json('GET', '/api/orders');
        $response->assertStatus(200);
    }


    public function testGetOrderById()
    {
        /** @var TestResponse $response */
        $response = $this->testCreateOrder();

        $json = json_decode($response->decodeResponseJson()->json);

        $response = $this->json('GET', '/api/orders/' . $json->id);
        $response->assertStatus(200);
    }

    public function testGetUnexistedOrderById()
    {
        $response = $this->json('GET', '/api/orders/1');
        $response->assertStatus(422);
    }

    public function testUpdateOrder()
    {
        /** @var TestResponse $response */
        $response = $this->testCreateOrder();

        $json = json_decode($response->decodeResponseJson()->json);

        $order = $this->orderJson();
        $order['products'][0]['quantity'] = 2;
        $order['status_id'] = 1;

        $response = $this->json('PUT', '/api/orders/' . $json->id, $order);
        $response->assertStatus(200);
    }

    public function testUpdateUnexistedOrder()
    {
        $order = $this->orderJson();
        $order['products'][0]['quantity'] = 2;
        $order['status_id'] = 1;

        $response = $this->json('PUT', '/api/orders/1', $order);
        $response->assertStatus(422);
    }

    public function testUpdateOrderInvalidData()
    {
        /** @var TestResponse $response */
        $response = $this->testCreateOrder();

        $json = json_decode($response->decodeResponseJson()->json);

        $order = $this->orderJson();
        $order['products'][0]['quantity'] = 2;

        $response = $this->json('PUT', '/api/orders/' . $json->id, $order);
        $response->assertStatus(422);
    }

    public function testDeleteOrder()
    {
        /** @var TestResponse $response */
        $response = $this->testCreateOrder();

        $json = json_decode($response->decodeResponseJson()->json);

        $response = $this->json('DELETE', '/api/orders/' . $json->id);
        $response->assertStatus(200);
    }

    public function testDeleteUnexistedOrder()
    {
        $response = $this->json('DELETE', '/api/orders/1');
        $response->assertStatus(422);
    }


    /** @return array function returns a json Order*/
    private function orderJson(): array
    {
        $customer = [
            "nip" => "12345678901",
            "name" => "kontrahent2",
            "contact_name" => "imie",
            "contact_surname" => "nazwisko",
            "email" => "email@email.com",
            "phone" => "tel",
            "address" => "adres"
        ];
        $product = [
            "product_id" => 3,
            "name" => "nazwa produktu",
            "netPrice" => 30.54,
            "vatRate" => 1.05,
            "measureUnit" => "kg",
            "quantity" => 12,
            "isService" => false
        ];
        $order = [
            "customer" => $customer,
            "products" => [
                $product
            ]
        ];
        return $order;
    }
}
