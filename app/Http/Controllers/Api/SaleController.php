<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Centro;
use App\Repositories\OrderRepository;
use Inertia\Inertia;


class SaleController extends Controller
{

    private OrderRepository $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }
    public function index($year=NULL,$month = NULL)
    {

        if ($year == NULL){
            $year = date('Y');
        }
        if ($month == NULL){
            $month = date("m");
        }


        $total          = $this->orderRepository->totalByYearAndMonth($year,$month);
        $total_online   = $this->orderRepository->totalByCentroYearAndMonth(2,$year,$month);
        $total_sv       = $this->orderRepository->totalByCentroYearAndMonth(4,$year,$month);
        $total_pc       = $this->orderRepository->totalByCentroYearAndMonth(13,$year,$month);


        return response()->json([
            'total'         =>$total,
            'month'         =>$month,
            'year'          =>$year,
            'total_online'  =>$total_online,
            'total_sv'      =>$total_sv,
            'total_pc'      =>$total_pc,
        ]);

    }

    public function center($center, $year=NULL,$month = NULL)
    {

        if ($year == NULL){
            $year = date('Y');
        }
        if ($month == NULL){
            $month = date("m");
        }

        $center = Centro::find($center);
        $sales = $this->orderRepository->orderByCentroYearAndMonth($center->id,$year,$month);
        $total  = $this->orderRepository->totalByCentroYearAndMonth($center->id,$year,$month);


        return response()->json([
            'center'=>$center->name,
            'sales'=>$sales,
            'total'=>$total,
            'month'=>$month,
            'year' =>$year,
        ]);


    }
}
