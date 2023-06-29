<?php

namespace App\Http\Controllers\Report;


use App\Http\Controllers\Controller;
use App\Models\State;
use App\Models\User;
use Inertia\Inertia;


class ReportStateController extends Controller
{


    public function index(){

        $year = date('Y');
        $month = date("m");


        return Inertia::render('Report/State/Index',[
         //   'orders'=>$orders,
        //    'total'=>$total,
        ]);
    }
    public function year_sales($year = NULL ){

        if ($year == NULL){
            $year = date('Y');
        }
        $users = User::ofOrdersYear($year)->get();
        $states = $users->unique('state_id');
        $data = array();

        foreach ($states as $i => $state){
            $total = 0;
            $usrs = User::ofOrdersStatesYear($state->state_id,$year)->get();

            foreach ($usrs as $usr){
                foreach ($usr->orders->where('status',2)->where('ano',$year) as $order){
                    $total = $total + $order->total;
                }
            }

            $stte = State::find($state->state_id);

            if (isset($stte)){
                $data[$i] = array(
                    'state'             => $stte->uf,
                    'id'                => $stte->id,
                    'user_count'        => $usrs->count(),
                    'total'             => $total,
                    'users'             => array(),
                    'orders_count'      => 0

                );
            }
            $orders_count = 0;

            foreach ($usrs as $k => $user) {
                $count_users    = 0;
                $total          = 0;
                $count_items    = 0;
                foreach ($user->orders as $order){
                    if ($order->status == 2 AND $order->ano == $year){
                        $count_users = $count_users + 1;
                        foreach ($order->items as $item){
                            $total = $total + $item->price;
                            $count_items = $count_items + 1;
                        }
                    }
                }
                $data[$i]['users'][$k] =
                    [
                        'user_id'       => $user->id,
                        'name'          => $user->name,
                        'city'          => $user->city->name,
                        'total'         => $total,
                        'count_items'   => $count_items,
                    ];
                $users_count            = $orders_count + $count_users;
            }
            $data[$i]['users_count']        =   $users_count;
        }

        $data = collect($data)->sortBy('total')->reverse()->toArray();

        return Inertia::render('Report/State/Sales',[
               'data'       =>$data,
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
        $states = $users->unique('state_id');
        $data = array();

        foreach ($states as $i => $state){
            $total = 0;
            $usrs = User::ofOrdersStatesYearAndMonth($state->state_id,$year,$month)->get();

            foreach ($usrs as $usr){
                foreach ($usr->orders->where('status',2)->where('ano',$year)->where('mes',$month) as $order){
                    $total = $total + $order->total;
                }
            }

            $stte = State::find($state->state_id);

            if (isset($stte)){
                $data[$i] = array(
                    'state'             => $stte->uf,
                    'id'                => $stte->id,
                    'user_count'        => $usrs->count(),
                    'total'             => $total,
                    'users'             => array(),
                    'orders_count'      => 0

                );
            }
            $orders_count = 0;

            foreach ($usrs as $k => $user) {
                $count_users    = 0;
                $total          = 0;
                $count_items    = 0;
                foreach ($user->orders as $order){
                    if ($order->status == 2 AND $order->ano == $year AND $order->mes == $month){
                        $count_users = $count_users + 1;
                        foreach ($order->items as $item){
                            $total = $total + $item->price;
                            $count_items = $count_items + 1;
                        }
                    }
                }
                $data[$i]['users'][$k] =
                    [
                        'user_id'       => $user->id,
                        'name'          => $user->name,
                        'city'          => $user->city->name,
                        'total'         => $total,
                        'count_items'   => $count_items,
                    ];
                $users_count            = $orders_count + $count_users;
            }
            $data[$i]['users_count']        =   $users_count;
        }

        $data = collect($data)->sortBy('total')->reverse()->toArray();

        return Inertia::render('Report/State/Sales',[
            'data'       =>$data,
            'month'      =>$month,

        ]);
    }


    public function year_quantity($year = NULL ){

        if ($year == NULL){
            $year = date('Y');
        }
        $users = User::ofOrdersYear($year)->get();
        $states = $users->unique('state_id');
        $data = array();

        foreach ($states as $i => $state){
            $total = 0;
            $usrs = User::ofOrdersStatesYear($state->state_id,$year)->get();

            foreach ($usrs as $usr){
                foreach ($usr->orders->where('status',2)->where('ano',$year) as $order){
                    $total = $total + $order->total;
                }
            }

            $stte = State::find($state->state_id);

            if (isset($stte)){
                $data[$i] = array(
                    'state'             => $stte->uf,
                    'id'                => $stte->id,
                    'user_count'        => $usrs->count(),
                    'total'             => $total,
                    'users'             => array(),
                    'orders_count'      => 0

                );
            }
            $orders_count = 0;

            foreach ($usrs as $k => $user) {
                $count_users    = 0;
                $total          = 0;
                $count_items    = 0;
                foreach ($user->orders as $order){
                    if ($order->status == 2 AND $order->ano == $year){
                        $count_users = $count_users + 1;
                        foreach ($order->items as $item){
                            $total = $total + $item->price;
                            $count_items = $count_items + 1;
                        }
                    }
                }
                $data[$i]['users'][$k] =
                    [
                        'user_id'       => $user->id,
                        'name'          => $user->name,
                        'city'          => $user->city->name,
                        'total'         => $total,
                        'count_items'   => $count_items,
                    ];
                $users_count            = $orders_count + $count_users;
            }
            $data[$i]['users_count']        =   $users_count;
        }

        $data = collect($data)->sortBy('user_count')->reverse()->toArray();

        return Inertia::render('Report/State/Quantity',[
            'data'       =>$data,
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
        $states = $users->unique('state_id');
        $data = array();

        foreach ($states as $i => $state){
            $total = 0;
            $usrs = User::ofOrdersStatesYearAndMonth($state->state_id,$year,$month)->get();

            foreach ($usrs as $usr){
                foreach ($usr->orders->where('status',2)->where('ano',$year)->where('mes',$month) as $order){
                    $total = $total + $order->total;
                }
            }

            $stte = State::find($state->state_id);

            if (isset($stte)){
                $data[$i] = array(
                    'state'             => $stte->uf,
                    'id'                => $stte->id,
                    'user_count'        => $usrs->count(),
                    'total'             => $total,
                    'users'             => array(),
                    'orders_count'      => 0

                );
            }
            $orders_count = 0;

            foreach ($usrs as $k => $user) {
                $count_users    = 0;
                $total          = 0;
                $count_items    = 0;
                foreach ($user->orders as $order){
                    if ($order->status == 2 AND $order->ano == $year AND $order->mes == $month){
                        $count_users = $count_users + 1;
                        foreach ($order->items as $item){
                            $total = $total + $item->price;
                            $count_items = $count_items + 1;
                        }
                    }
                }
                $data[$i]['users'][$k] =
                    [
                        'user_id'       => $user->id,
                        'name'          => $user->name,
                        'city'          => $user->city->name,
                        'total'         => $total,
                        'count_items'   => $count_items,
                    ];
                $users_count            = $orders_count + $count_users;
            }
            $data[$i]['users_count']    =   $users_count;
        }

        $data = collect($data)->sortBy('user_count')->reverse()->toArray();

        return Inertia::render('Report/State/Quantity',[
            'data'       =>$data,
            'month'      =>$month,

        ]);
    }
}
