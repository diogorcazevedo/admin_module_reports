<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;


class LoginController extends Controller
{


    public function login(Request $request)
    {
        $credentials = $request->only(['email','password']);
//        if (!$token = auth('api')->attempt($credentials)){
//            abort(401);
//        }

        $data = $request->all();
        if (!$token = auth('api')->attempt(['email' => $data['email'], 'password' => $data['password'], 'report' => 1])){
            abort(401);
        }

        return response()->json([
            'user'=>auth()->guard('api')->user(),
            'token'=>$token,
            'refresh_token'=>"add6c244-309f-4e23-95cc-298bbe4de29a",
            'token_type'=>'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);




    }


}
