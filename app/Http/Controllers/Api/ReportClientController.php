<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class ReportClientController extends Controller
{


    public function year_sales($year = NULL , $center){

        if ($year == NULL){
            $year = date('Y');
        }
        $users = User::ofApiOrdersYear($year, $center)->get();
        $data = array();

        foreach ($users as $k => $user) {
            $total = 0;
            foreach ($user->orders->where('status' , 2)->where('ano' , $year)->where('centro' , $center) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->orders->where('status' , 2)->where('ano' , $year)->where('centro' , $center)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('total')->reverse()->toArray();

        $total = Order::where('ano',$year)->where('status',2)->where('centro' , $center)->sum('total');


        return response()->json([
            'data'       =>$data,
            'total'      =>$total,
            'month'      =>date('m'),
        ]);
    }
    public function month_sales($year = NULL , $month = NULL , $center ){

        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }

        $users = User::ofApiOrdersYearAndMonth($year,$month ,$center)->get();
        $data = array();

        foreach ($users as $k => $user) {
            $total = 0;
            foreach ($user->orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month)->where('centro' , $center) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month)->where('centro' , $center)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('total')->reverse()->toArray();

        $total = Order::where('mes',$month)->where('ano',$year)->where('status',2)->where('centro' , $center)->sum('total');


        return response()->json([
            'data'       =>$data,
            'total'      =>$total,
            'month'      =>$month,
        ]);
    }
    public function year_quantity($year = NULL , $center){

        if ($year == NULL){
            $year = date('Y');
        }

        $users = User::ofApiOrdersYear($year , $center)->get();
        $data = array();

        foreach ($users as $k => $user) {
            $total = 0;
            foreach ($user->orders->where('status' , 2)->where('ano' , $year)->where('centro' , $center) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->orders->where('status' , 2)->where('ano' , $year)->where('centro' , $center)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('orders')->reverse()->toArray();

        $total = Order::where('ano',$year)->where('status',2)->where('centro' , $center)->sum('total');

        return response()->json([
            'data'       =>$data,
            'total'      =>$total,
            'month'      =>date('m'),
        ]);
    }
    public function month_quantity($year = NULL , $month = NULL , $center){

        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }

        $users = User::ofApiOrdersYearAndMonth($year,$month,$center)->get();
        $data = array();

        foreach ($users as $k => $user) {
            $total = 0;
            foreach ($user->orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month)->where('centro' , $center) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month)->where('centro' , $center)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('orders')->reverse()->toArray();

        $total = Order::where('mes',$month)->where('ano',$year)->where('status',2)->where('centro' , $center)->sum('total');


        return response()->json([
            'data'       =>$data,
            'total'      =>$total,
            'month'      =>$month,
        ]);
    }
    public function year_cac($year = NULL , $center){

        if ($year == NULL){
            $year = date('Y');
        }
        $users = User::ofApiOrdersYear($year,$center)->get();

        $new = array();
        $old = array();
        $new_total = 0;
        $old_total = 0;

        foreach ($users as $user){
            $user = User::find($user->id);
            $order_count = DB::table('orders')->where('user_id',$user->id)
                                                    ->where('status', 2)
                                                    ->where('centro' , $center)
                                                    ->where('ano','!=', $year)
                                                    ->count();

            if ($order_count < 1){
                //novos clientes

                    $dtNew = [
                        'user_id'       => $user->id,
                        'user'          => $user->name,
                        'orders'        => $user->orders->where('status', 2)->where('ano', $year)->where('centro' , $center)->count(),
                        'total'         => $user->orders->where('status', 2)->where('ano', $year)->where('centro' , $center)->sum('total'),
                    ];

                    $new[] = $dtNew;

                    $new_total = $new_total + $user->orders->where('status', 2)->where('ano', $year)->where('centro' , $center)->sum('total');

           }else{
               //antigos clientes

                $dtOld  = [
                    'user_id'       => $user->id,
                    'user'          => $user->name,
                    'orders'        => $user->orders->where('status', 2)->where('ano', $year)->where('centro' , $center)->count(),
                    'total'         => $user->orders->where('status', 2)->where('ano', $year)->where('centro' , $center)->sum('total'),
                ];
                $old[] = $dtOld;

                $old_total = $old_total + $user->orders->where('status', 2)->where('ano', $year)->where('centro' , $center)->sum('total');
            }

        }

        $new = collect($new)->sortBy('total')->reverse()->toArray();
        $old= collect($old)->sortBy('total')->reverse()->toArray();


        return response()->json([
            'new_clients'       =>$new,
            'old_clients'       =>$old,
            'new_total'         =>$new_total,
            'old_total'         =>$old_total,
            'month'             =>date('m'),
        ]);
    }
    public function month_cac($year = NULL , $month = NULL , $center){

        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }
        $users = User::ofApiOrdersYearAndMonth($year,$month,$center)->get();

        $new = array();
        $old = array();
        $new_total = 0;
        $old_total = 0;

        foreach ($users as $user){
            $user = User::find($user->id);
            $order_count = DB::table('orders')->where('user_id',$user->id)
                ->where('status', 2)
                ->where('centro' , $center)
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
                        'orders'        => $user->orders->where('status', 2)->where('ano', $year)->where('mes', $month)->where('centro' , $center)->count(),
                        'total'         => $user->orders->where('status', 2)->where('ano', $year)->where('mes', $month)->where('centro' , $center)->sum('total'),
                    ];

                    $new[] = $dtNew;
                    $new_total = $new_total + $user->orders->where('status', 2)->where('ano', $year)->where('mes', $month)->where('centro' , $center)->sum('total');
           }else{
               //antigos clientes

                $dtOld  = [
                    'user_id'       => $user->id,
                    'user'          => $user->name,
                    'orders'        => $user->orders->where('status', 2)->where('ano', $year)->where('mes', $month)->where('centro' , $center)->count(),
                    'total'         => $user->orders->where('status', 2)->where('ano', $year)->where('mes', $month)->where('centro' , $center)->sum('total'),
                ];
                $old[] = $dtOld;
                $old_total = $old_total + $user->orders->where('status', 2)->where('ano', $year)->where('mes', $month)->where('centro' , $center)->sum('total');
            }

        }

        $new = collect($new)->sortBy('total')->reverse()->toArray();
        $old= collect($old)->sortBy('total')->reverse()->toArray();



        return response()->json([
            'new_clients'       =>$new,
            'old_clients'       =>$old,
            'new_total'         =>$new_total,
            'old_total'         =>$old_total,
            'month'             =>$month,
        ]);
    }
    public function year_gender($gender, $year = NULL , $center){

        if ($year == NULL){
            $year = date('Y');
        }
        $users = User::ofApiOrdersYear($year,$center)->get();
        $data = array();

        foreach ($users->where('gender',$gender) as $k => $user) {
            $total = 0;
            foreach ($user->orders->where('status' , 2)->where('ano' , $year)->where('centro' , $center) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->orders->where('status' , 2)->where('ano' , $year)->where('centro' , $center)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('total')->reverse()->toArray();

        $total = Order::where('ano',$year)
                        ->where('status',2)
                        ->where('centro' , $center)
                        ->whereHas('user', function($q) use($gender){
                            $q->where('gender',$gender);
                        })
                        ->sum('total');

        return response()->json([
            'data'       =>$data,
            'total'      =>$total,
            'month'      =>date('m'),
        ]);
    }
    public function month_gender($gender, $year = NULL , $month = NULL , $center){

        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }

        $users = User::ofApiOrdersYearAndMonth($year,$month,$center)->get();
        $data = array();

        foreach ($users->where('gender',$gender) as $k => $user) {
            $total = 0;
            foreach ($user->orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month)->where('centro' , $center) as $order){
                $total = $total + $order->total;
            }

            $dt = [
                'user'          => $user->name,
                'orders'        => $user->orders->where('status' , 2)->where('ano' , $year)->where('mes' , $month)->where('centro' , $center)->count(),
                'total'         => $total,
            ];

            $data[] = $dt;
        }
        $data = collect($data)->sortBy('total')->reverse()->toArray();

        $total = Order::where('mes',$month)
                        ->where('ano',$year)
                        ->where('status',2)
                        ->where('centro' , $center)
                        ->whereHas('user', function($q) use($gender){
                            $q->where('gender',$gender);
                        })
                        ->sum('total');


        return response()->json([
            'data'       =>$data,
            'total'      =>$total,
            'month'      =>$month,
        ]);
    }


}
