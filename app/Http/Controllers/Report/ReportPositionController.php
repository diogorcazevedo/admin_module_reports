<?php

namespace App\Http\Controllers\Report;


use App\Http\Controllers\Controller;
use Inertia\Inertia;


class ReportPositionController extends Controller
{


    public function index(){

        $year = date('Y');
        $month = date("m");


        return Inertia::render('Report/Position/Index',[
         //   'orders'=>$orders,
        //    'total'=>$total,
        ]);
    }


}
