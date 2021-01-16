<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Exception;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    //
    public function getAllStatus()
    {
        try {
            $all = Status::all();
            return response()->json($all, 200);
        } catch (Exception $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        }
    }
}
