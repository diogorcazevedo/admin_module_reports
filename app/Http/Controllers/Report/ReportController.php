<?php

namespace App\Http\Controllers\Report;



use App\Http\Controllers\Controller;
use Inertia\Inertia;


class ReportController extends Controller
{


    public function index(){

        $year = date('Y');
        $month = date("m");

        return Inertia::render('Report/Index',[
            'year'=>$year,
            'month'=>$month,
        ]);
    }

}
