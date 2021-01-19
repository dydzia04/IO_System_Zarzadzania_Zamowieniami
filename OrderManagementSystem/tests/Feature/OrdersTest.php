<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class OrdersTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function getOrderList()
    {
        $response = $this->get("/api/orders");
        $response->assertStatus(200);
    }

    public function getOrderById()
    {
        $response = $this->get("/api/orders");
        $response->assertStatus(200);   
    }
}
