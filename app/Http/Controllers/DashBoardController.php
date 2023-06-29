<?php

namespace App\Http\Controllers;



use App\Repositories\OrderRepository;
use Inertia\Inertia;


class DashBoardController extends Controller
{

    private OrderRepository $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }
    public function index(){

        $year = date('Y');
        $month = date("m");
       // $orders = $this->orderRepository->orderByYearAndMonth($year,$month);
        $total  = $this->orderRepository->totalByYearAndMonth($year,$month);

        return Inertia::render('Dashboard',[
         //   'orders'=>$orders,
            'total'=>$total,
        ]);
    }

}
