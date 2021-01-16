<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\OrderController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\TestController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/status', [StatusController::class, 'getAllStatus']);

Route::get('/customers', [CustomerController::class, 'getAllCustomers']);
Route::get('/customers/{nip}', [CustomerController::class, 'getCustomerByNIP']);

Route::get('/orders', [OrderController::class, 'getAllOrders']);
Route::post('/orders', [OrderController::class, 'postCreateOrder']);
Route::get('/orders/{id}', [OrderController::class, 'getOrderById']);
Route::put('/orders/{id}', [OrderController::class, 'putUpdateOrder']);
Route::delete('/orders/{id}', [OrderController::class, 'deleteOrder']);




Route::get('/orders/status/all', [OrderController::class, 'getAllStatus']);
Route::put('/orders/status/{id}', [OrderController::class, 'changeStatus']);

Route::get('/orders/customer/{nip}', [OrderController::class, 'getForCustomer']);
