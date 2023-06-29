<?php

namespace App\Http\Controllers\Report;


use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Inertia\Inertia;


class ReportSellerController extends Controller
{

    public function index(){

        $year = date('Y');
        $month = date("m");


        return Inertia::render('Report/Seller/Index',[
         //   'orders'=>$orders,
        //    'total'=>$total,
        ]);
    }
    public function year_sales($year = NULL ){

        if ($year == NULL){
            $year = date('Y');
        }
        $users = User::ofSellerOrdersYear($year)->get();
        $data = array();

        foreach ($users as $k => $user) {
            $total = 0;
            foreach ($user->seller_orders->where('status' , 2)->where('ano' , $year) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->seller_orders->where('status' , 2)->where('ano' , $year)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('total')->reverse()->toArray();

        $total = Order::where('ano',$year)->where('status',2)->sum('total');

        return Inertia::render('Report/Seller/Sales',[
               'data'       =>$data,
               'total'      =>$total,
               'month'      =>date('m'),

        ]);
    }
    public function month_sales($year = NULL , $month = NULL){

        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }

        $users = User::ofSellerOrdersYearAndMonth($year,$month)->get();
        $data = array();

        foreach ($users as $k => $user) {
            $total = 0;
            foreach ($user->seller_orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->seller_orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('total')->reverse()->toArray();

        $total = Order::where('mes',$month)->where('ano',$year)->where('status',2)->sum('total');

        return Inertia::render('Report/Seller/Sales',[
               'data'       =>$data,
               'total'      =>$total,
               'month'      =>$month,

        ]);
    }
    public function year_quantity($year = NULL ){

        if ($year == NULL){
            $year = date('Y');
        }

        $users = User::ofSellerOrdersYear($year)->get();
        $data = array();

        foreach ($users as $k => $user) {
            $total = 0;
            foreach ($user->seller_orders->where('status' , 2)->where('ano' , $year) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->seller_orders->where('status' , 2)->where('ano' , $year)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('orders')->reverse()->toArray();

        $total = Order::where('ano',$year)->where('status',2)->sum('total');

        return Inertia::render('Report/Seller/Quantity',[
               'data'       =>$data,
               'total'      =>$total,
               'month'      =>date('m'),

        ]);
    }
    public function month_quantity($year = NULL , $month = NULL){

        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }

        $users = User::ofSellerOrdersYearAndMonth($year,$month)->get();
        $data = array();

        foreach ($users as $k => $user) {
            $total = 0;
            foreach ($user->seller_orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->seller_orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('orders')->reverse()->toArray();

        $total = Order::where('mes',$month)->where('ano',$year)->where('status',2)->sum('total');

        return Inertia::render('Report/Seller/Quantity',[
               'data'       =>$data,
               'total'      =>$total,
               'month'      =>$month,

        ]);
    }
}
