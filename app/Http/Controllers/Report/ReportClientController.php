<?php

namespace App\Http\Controllers\Report;


use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class ReportClientController extends Controller
{


    public function index(){

        $year = date('Y');
        $month = date("m");


        return Inertia::render('Report/Client/Index',[
         //   'orders'=>$orders,
        //    'total'=>$total,
        ]);
    }
    public function year_sales($year = NULL ){

        if ($year == NULL){
            $year = date('Y');
        }
        $users = User::ofOrdersYear($year)->get();
        $data = array();

        foreach ($users as $k => $user) {
            $total = 0;
            foreach ($user->orders->where('status' , 2)->where('ano' , $year) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->orders->where('status' , 2)->where('ano' , $year)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('total')->reverse()->toArray();

        $total = Order::where('ano',$year)->where('status',2)->sum('total');

        return Inertia::render('Report/Client/Sales',[
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

        $users = User::ofOrdersYearAndMonth($year,$month)->get();
        $data = array();

        foreach ($users as $k => $user) {
            $total = 0;
            foreach ($user->orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('total')->reverse()->toArray();

        $total = Order::where('mes',$month)->where('ano',$year)->where('status',2)->sum('total');

        return Inertia::render('Report/Client/Sales',[
               'data'       =>$data,
               'total'      =>$total,
               'month'      =>$month,

        ]);
    }
    public function year_quantity($year = NULL ){

        if ($year == NULL){
            $year = date('Y');
        }

        $users = User::ofOrdersYear($year)->get();
        $data = array();

        foreach ($users as $k => $user) {
            $total = 0;
            foreach ($user->orders->where('status' , 2)->where('ano' , $year) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->orders->where('status' , 2)->where('ano' , $year)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('orders')->reverse()->toArray();

        $total = Order::where('ano',$year)->where('status',2)->sum('total');

        return Inertia::render('Report/Client/Quantity',[
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

        $users = User::ofOrdersYearAndMonth($year,$month)->get();
        $data = array();

        foreach ($users as $k => $user) {
            $total = 0;
            foreach ($user->orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('orders')->reverse()->toArray();

        $total = Order::where('mes',$month)->where('ano',$year)->where('status',2)->sum('total');

        return Inertia::render('Report/Client/Quantity',[
               'data'       =>$data,
               'total'      =>$total,
               'month'      =>$month,

        ]);
    }
    public function year_cac($year = NULL ){

        if ($year == NULL){
            $year = date('Y');
        }
        $users = User::ofOrdersYear($year)->get();

        $new = array();
        $old = array();
        $new_total = 0;
        $old_total = 0;

        foreach ($users as $user){
            $user = User::find($user->id);
            $order_count = DB::table('orders')->where('user_id',$user->id)
                                                    ->where('status', 2)
                                                    ->where('ano','!=', $year)
                                                    ->count();

            if ($order_count < 1){
                //novos clientes

                    $dtNew = [
                        'user_id'       => $user->id,
                        'user'          => $user->name,
                        'orders'        => $user->orders->where('status', 2)->where('ano', $year)->count(),
                        'total'         => $user->orders->where('status', 2)->where('ano', $year)->sum('total'),
                    ];

                    $new[] = $dtNew;

                    $new_total = $new_total + $user->orders->where('status', 2)->where('ano', $year)->sum('total');

           }else{
               //antigos clientes

                $dtOld  = [
                    'user_id'       => $user->id,
                    'user'          => $user->name,
                    'orders'        => $user->orders->where('status', 2)->where('ano', $year)->count(),
                    'total'         => $user->orders->where('status', 2)->where('ano', $year)->sum('total'),
                ];
                $old[] = $dtOld;

                $old_total = $old_total + $user->orders->where('status', 2)->where('ano', $year)->sum('total');
            }

        }

        $new = collect($new)->sortBy('total')->reverse()->toArray();
        $old= collect($old)->sortBy('total')->reverse()->toArray();


        return Inertia::render('Report/Client/Cac',[
            'new_clients'       =>$new,
            'old_clients'       =>$old,
            'new_total'         =>$new_total,
            'old_total'         =>$old_total,
            'month'             =>date('m'),

        ]);
    }
    public function month_cac($year = NULL , $month = NULL){

        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }
        $users = User::ofOrdersYearAndMonth($year,$month)->get();

        $new = array();
        $old = array();
        $new_total = 0;
        $old_total = 0;

        foreach ($users as $user){
            $user = User::find($user->id);
            $order_count = DB::table('orders')->where('user_id',$user->id)
                ->where('status', 2)
                ->where(function (Builder $query) use ($year,$month) {
                    $query->where('ano','!=', $year)
                        ->orWhere('mes','!=', $month);
                })
                ->count();

            if ($order_count < 1){
                //novos clientes

                    $dtNew = [
                        'user_id'       => $user->id,
                        'user'          => $user->name,
                        'orders'        => $user->orders->where('status', 2)->where('ano', $year)->where('mes', $month)->count(),
                        'total'         => $user->orders->where('status', 2)->where('ano', $year)->where('mes', $month)->sum('total'),
                    ];

                    $new[] = $dtNew;
                    $new_total = $new_total + $user->orders->where('status', 2)->where('ano', $year)->where('mes', $month)->sum('total');
           }else{
               //antigos clientes

                $dtOld  = [
                    'user_id'       => $user->id,
                    'user'          => $user->name,
                    'orders'        => $user->orders->where('status', 2)->where('ano', $year)->where('mes', $month)->count(),
                    'total'         => $user->orders->where('status', 2)->where('ano', $year)->where('mes', $month)->sum('total'),
                ];
                $old[] = $dtOld;
                $old_total = $old_total + $user->orders->where('status', 2)->where('ano', $year)->where('mes', $month)->sum('total');
            }

        }

        $new = collect($new)->sortBy('total')->reverse()->toArray();
        $old= collect($old)->sortBy('total')->reverse()->toArray();


        return Inertia::render('Report/Client/Cac',[
            'new_clients'       =>$new,
            'old_clients'       =>$old,
            'new_total'         =>$new_total,
            'old_total'         =>$old_total,
            'month'             =>$month,

        ]);
    }
    public function year_gender($gender, $year = NULL ){

        if ($year == NULL){
            $year = date('Y');
        }
        $users = User::ofOrdersYear($year)->get();
        $data = array();

        foreach ($users->where('gender',$gender) as $k => $user) {
            $total = 0;
            foreach ($user->orders->where('status' , 2)->where('ano' , $year) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->orders->where('status' , 2)->where('ano' , $year)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('total')->reverse()->toArray();

        $total = Order::where('ano',$year)
                        ->where('status',2)
                        ->whereHas('user', function($q) use($gender){
                            $q->where('gender',$gender);
                        })
                        ->sum('total');

        return Inertia::render('Report/Client/Gender',[
            'data'       =>$data,
            'total'      =>$total,
            'month'      =>date('m'),

        ]);
    }
    public function month_gender($gender, $year = NULL , $month = NULL){

        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }

        $users = User::ofOrdersYearAndMonth($year,$month)->get();
        $data = array();

        foreach ($users->where('gender',$gender) as $k => $user) {
            $total = 0;
            foreach ($user->orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('total')->reverse()->toArray();

        $total = Order::where('mes',$month)
                        ->where('ano',$year)
                        ->where('status',2)
                        ->whereHas('user', function($q) use($gender){
                            $q->where('gender',$gender);
                        })
                        ->sum('total');

        return Inertia::render('Report/Client/Gender',[
            'data'       =>$data,
            'total'      =>$total,
            'month'      =>$month,

        ]);
    }


}
