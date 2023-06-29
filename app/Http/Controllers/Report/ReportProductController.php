<?php

namespace App\Http\Controllers\Report;



use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Repositories\ReportProductRepository;
use Inertia\Inertia;


class ReportProductController extends Controller
{

    private ReportProductRepository $reportProductRepository;

    public function __construct(ReportProductRepository $reportProductRepository)
    {
        $this->reportProductRepository = $reportProductRepository;
    }

    public function index(){

        $year = date('Y');
        $month = date("m");


        return Inertia::render('Report/Product/Index',[
         //   'orders'=>$orders,
        //    'total'=>$total,
        ]);
    }
    public function year_sales($year = NULL ){

        if ($year == NULL){
            $year = date('Y');
        }
        $products = Product::ofOrdersYear($year)->get();
        $data = array();
        foreach ($products as $k => $product) {
            $total = 0;
            $orders = 0;
            foreach ($product->order_items as $item){
                if (isset($item->order) AND $item->order->status == 2){
                    if ($item->order->ano == $year){
                        $total = $total + $item->price;
                        $orders = $product->order_items->where('order.ano',$year)->count();
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

        $total = Order::where('ano',$year)->where('status',2)->sum('total');

        return Inertia::render('Report/Product/Sales',[
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

        $products = Product::ofOrdersYearAndMonth($year,$month)->get();
        $data = array();
        foreach ($products as $k => $product) {
            $total = 0;
            $orders = 0;
            foreach ($product->order_items as $item){
                if (isset($item->order) AND $item->order->status == 2){
                    if ($item->order->mes == $month){
                        if ($item->order->ano == $year){
                            $total = $total + $item->price;
                            $orders = $product->order_items->where('order.ano',$year)->where('order.mes',$month)->count();
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

        $total = Order::where('mes',$month)->where('ano',$year)->where('status',2)->sum('total');

        return Inertia::render('Report/Product/Sales',[
               'data'       =>$data,
               'total'      =>$total,
               'month'      =>$month,

        ]);
    }

    public function year_quantity($year = NULL ){

        if ($year == NULL){
            $year = date('Y');
        }

        $products = Product::ofOrdersYear($year)->get();
        $data = array();
        foreach ($products as $k => $product) {
            $total = 0;
            $orders = 0;
            foreach ($product->order_items as $item){
                if (isset($item->order) AND $item->order->status == 2){
                    if ($item->order->ano == $year){
                        $total = $total + $item->price;
                        $orders = $product->order_items->where('order.ano',$year)->count();
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

        $total = Order::where('ano',$year)->where('status',2)->sum('total');

        return Inertia::render('Report/Product/Quantity',[
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

        $products = Product::ofOrdersYearAndMonth($year,$month)->get();
        $data = array();
        foreach ($products as $k => $product) {
            $total = 0;
            $orders = 0;
            foreach ($product->order_items as $item){
                if (isset($item->order) AND $item->order->status == 2){
                    if ($item->order->mes == $month){
                        if ($item->order->ano == $year){
                            $total = $total + $item->price;
                            $orders = $product->order_items->where('order.ano',$year)->where('order.mes',$month)->count();
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

        $total = Order::where('mes',$month)->where('ano',$year)->where('status',2)->sum('total');

        return Inertia::render('Report/Product/Quantity',[
            'data'       =>$data,
            'total'      =>$total,
            'month'      =>$month,

        ]);
    }

}
