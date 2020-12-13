<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\OrderController;
use App\Http\Controllers\Controller;
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

Route::resource('/xd', TestController::class);

Route::get('/orders', [OrderController::class, 'getAllOrders']);
Route::get('/orders/{id}', [OrderController::class, 'getOrder']);
Route::put('/orders/{id}', [OrderController::class, 'updateOrder']);

Route::get('/orders/status', [OrderController::class, 'getAllStatus']);
Route::put('/orders/status/{id}', [OrderController::class, 'changeStatus']);

Route::get('/orders/customer/{nip}', [OrderController::class, 'getForCustomer']);
Route::post('/orders', [OrderController::class, 'createOrder']);
Route::delete('/orders/{id}', [OrderController::class, 'removeOrder']);
