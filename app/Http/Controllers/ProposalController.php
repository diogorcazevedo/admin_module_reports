<?php

namespace App\Http\Controllers;


use App\Repositories\OrderRepository;
use Inertia\Inertia;


class ProposalController extends Controller
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

        $orders = $this->orderRepository->orderOpenByYearAndMonth($year,$month);
        $total  = $this->orderRepository->totalOpenByYearAndMonth($year,$month);


        return Inertia::render('Proposal/Index',[
            'orders'=>$orders,
            'total'=>$total,
            'month'=>$month,
            'year' =>$year,
        ]);

    }
}
