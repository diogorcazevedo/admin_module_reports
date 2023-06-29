<?php

namespace App\Http\Controllers\Report;



use App\Http\Controllers\Controller;
use Inertia\Inertia;


class ReportSaleController extends Controller
{


    public function index(){

        $year = date('Y');
        $month = date("m");


        return Inertia::render('Report/Sale/Index',[
         //   'orders'=>$orders,
        //    'total'=>$total,
        ]);
    }

}
