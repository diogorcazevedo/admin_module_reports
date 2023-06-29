<?php

namespace App\Http\Controllers;


use App\Models\Order;
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

        //$orders         = $this->orderRepository->orderByYearAndMonth($year,$month,);
        $sales_others   = $this->orderRepository->orderByYearAndMonthNotIn($year,$month);
        $sales_online   = $this->orderRepository->orderByCentroYearAndMonth(2,$year,$month);
        $sales_sv       = $this->orderRepository->orderByCentroYearAndMonth(4,$year,$month);
        $sales_pc       = $this->orderRepository->orderByCentroYearAndMonth(13,$year,$month);



        $total          = $this->orderRepository->totalByYearAndMonth($year,$month);


        $total_others   =  Order::where('ano',$year)
                                    ->where('status', 2)
                                    ->where('mes',$month)
                                    ->whereNotIn('centro', ["2", "4", "13"])->sum('total');

        $total_online   = $this->orderRepository->totalByCentroYearAndMonth(2,$year,$month);
        $total_sv       = $this->orderRepository->totalByCentroYearAndMonth(4,$year,$month);
        $total_pc       = $this->orderRepository->totalByCentroYearAndMonth(13,$year,$month);




        return Inertia::render('Sales/Index',[
            'total'         =>$total,
            'month'         =>$month,
            'year'          =>$year,
            'sales_others'  =>$sales_others,
            'sales_pc'      =>$sales_pc,
            'sales_sv'      =>$sales_sv,
            'sales_online'  =>$sales_online,
            'total_others'  =>$total_others,
            'total_online'  =>$total_online,
            'total_sv'      =>$total_sv,
            'total_pc'      =>$total_pc,
        ]);

    }
}
