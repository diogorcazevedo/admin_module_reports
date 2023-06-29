<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Inertia\Inertia;


class ReportProductController extends Controller
{

    public function year_sales($year = NULL ,$center){

        if ($year == NULL){
            $year = date('Y');
        }
        $products = Product::ofApiOrdersYear($year,$center)->get();
        $data = array();
        foreach ($products as $k => $product) {
            $total = 0;
            $orders = 0;
            foreach ($product->order_items as $item){
                if (isset($item->order) AND $item->order->status == 2){
                    if ($item->order->ano == $year){
                        $total = $total + $item->price;
                        $orders = $product->order_items->where('order.ano',$year)->where('order.centro',$center)->count();
                    }
                }
            }
            if ($orders > 0){
                $dt = [
                    'id'            => $product->id,
                    'product'       => $product->name,
                    'orders'        => $orders,
                    'total'         => $total,
                ];

                $data[] = $dt;
            }
        }


        $data = collect($data)->sortBy('total')->reverse()->toArray();

        $total = Order::where('ano',$year)->where('status',2)->where('centro',$center)->sum('total');


        return response()->json([
            'data'       =>$data,
            'total'      =>$total,
            'month'      =>date('m'),
        ]);
    }
    public function month_sales($year = NULL , $month = NULL,$center){

        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }

        $products = Product::ofApiOrdersYearAndMonth($year,$month,$center)->get();
        $data = array();
        foreach ($products as $k => $product) {
            $total = 0;
            $orders = 0;
            foreach ($product->order_items as $item){
                if (isset($item->order) AND $item->order->status == 2){
                    if ($item->order->mes == $month){
                        if ($item->order->ano == $year){
                            $total = $total + $item->price;
                            $orders = $product->order_items->where('order.ano',$year)->where('order.mes',$month)->where('order.centro',$center)->count();
                        }
                    }
                }
            }
            if ($orders > 0){
                $dt = [
                    'id'            => $product->id,
                    'product'       => $product->name,
                    'orders'        => $orders,
                    'total'         => $total,
                ];

                $data[] = $dt;
            }


        }


        $data = collect($data)->sortBy('total')->reverse()->toArray();

        $total = Order::where('mes',$month)->where('ano',$year)->where('status',2)->where('centro',$center)->sum('total');


        return response()->json([
            'data'       =>$data,
            'total'      =>$total,
            'month'      =>$month,
        ]);
    }
    public function year_quantity($year = NULL ,$center){

        if ($year == NULL){
            $year = date('Y');
        }

        $products = Product::ofApiOrdersYear($year,$center)->get();
        $data = array();
        foreach ($products as $k => $product) {
            $total = 0;
            $orders = 0;
            foreach ($product->order_items as $item){
                if (isset($item->order) AND $item->order->status == 2){
                    if ($item->order->ano == $year){
                        $total = $total + $item->price;
                        $orders = $product->order_items->where('order.ano',$year)->where('order.centro',$center)->where('order.centro',$center)->count();
                    }
                }
            }
            if ($orders > 0){
                $dt = [
                    'id'            => $product->id,
                    'product'       => $product->name,
                    'orders'        => $orders,
                    'total'         => $total,
                ];

                $data[] = $dt;
            }
        }


        $data = collect($data)->sortBy('orders')->reverse()->toArray();

        $total = Order::where('ano',$year)->where('status',2)->where('centro',$center)->sum('total');

        return response()->json([
            'data'       =>$data,
            'total'      =>$total,
            'month'      =>date('m'),
        ]);
    }
    public function month_quantity($year = NULL , $month = NULL,$center){

        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }

        $products = Product::ofApiOrdersYearAndMonth($year,$month,$center)->get();
        $data = array();
        foreach ($products as $k => $product) {
            $total = 0;
            $orders = 0;
            foreach ($product->order_items as $item){
                if (isset($item->order) AND $item->order->status == 2){
                    if ($item->order->mes == $month){
                        if ($item->order->ano == $year){
                            $total = $total + $item->price;
                            $orders = $product->order_items->where('order.ano',$year)->where('order.mes',$month)->where('order.centro',$center)->count();
                        }
                    }
                }
            }
            if ($orders > 0){
                $dt = [
                    'id'            => $product->id,
                    'product'       => $product->name,
                    'orders'        => $orders,
                    'total'         => $total,
                ];

                $data[] = $dt;
            }
        }

        $data = collect($data)->sortBy('orders')->reverse()->toArray();
        $total = Order::where('mes',$month)->where('ano',$year)->where('status',2)->where('centro',$center)->sum('total');

        return response()->json([
            'data'       =>$data,
            'total'      =>$total,
            'month'      =>$month,
        ]);
    }

}
