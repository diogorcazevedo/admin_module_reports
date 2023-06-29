<?php

namespace App\Http\Controllers\Report;


use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;


class ReportCenterController extends Controller
{

    public function index(){

        $year = date('Y');
        $month = date("m");


        return Inertia::render('Report/Center/Index',[
         //   'orders'=>$orders,
        //    'total'=>$total,
        ]);
    }
    public function year_sales($year = NULL ){

        if ($year == NULL){
            $year = date('Y');
        }

        $sales                          = Order::ofOrderByYear($year)->with('ponto')->get();
        $sales_total                    = $sales->sum('total');
        //$order_centers                    = $sales->unique('centro');
        $order_centers                  = $sales->groupBy('centro')->all();


        return Inertia::render('Report/Center/Sales',[
            'data'              =>$order_centers,
            'month'             =>date('m'),
            'sales_total'       =>$sales_total,

        ]);
    }

    public function month_sales($year = NULL, $month = NULL ){

        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }

        $sales                          = Order::ofOrderByYearAndMonth($year,$month)->with('ponto')->get();
        $sales_total                    = $sales->sum('total');
        $order_centers                  = $sales->groupBy('centro')->all();


        return Inertia::render('Report/Center/Sales',[
            'data'              =>$order_centers,
            'month'             =>$month,
            'sales_total'       =>$sales_total,

        ]);


    }

    public function year_quantity($year = NULL ){

        //não mudei igual ao sales
        if ($year == NULL){
            $year = date('Y');
        }

        $sales                          = Order::ofOrderByYear($year)->with('ponto')->get();
        $sales_total                    = $sales->sum('total');
        $order_centers                  = $sales->groupBy('centro')->all();


        return Inertia::render('Report/Center/Quantity',[
            'data'              =>$order_centers,
            'month'             =>date('m'),
            'sales_total'       =>$sales_total,

        ]);

    }

    public function month_quantity($year = NULL, $month = NULL ){
        //não mudei igual ao sales

        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }

        $sales                          = Order::ofOrderByYearAndMonth($year,$month)->with('ponto')->get();
        $sales_total                    = $sales->sum('total');
        $order_centers                  = $sales->groupBy('centro')->all();


        return Inertia::render('Report/Center/Quantity',[
            'data'              =>$order_centers,
            'month'             =>$month,
            'sales_total'       =>$sales_total,

        ]);

    }

}
