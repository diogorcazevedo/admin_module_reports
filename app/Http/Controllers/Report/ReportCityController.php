<?php

namespace App\Http\Controllers\Report;


use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\User;
use Inertia\Inertia;


class ReportCityController extends Controller
{


    public function index(){

        $year = date('Y');
        $month = date("m");


        return Inertia::render('Report/City/Index',[
         //   'orders'=>$orders,
        //    'total'=>$total,
        ]);
    }

    public function year_sales($year = NULL ){

        if ($year == NULL){
            $year = date('Y');
        }
        $users = User::ofOrdersYear($year)->get();
        $cities = $users->unique('city_id');
        $data = array();



        foreach ($cities as $i => $city){
            $total = 0;
            $usrs = User::ofOrdersCityYear($city->city_id,$year)->get();

            foreach ($usrs as $usr){
                foreach ($usr->orders->where('status',2)->where('ano',$year) as $order){
                    $total = $total + $order->total;
                }
            }


            $cl = City::find($city->city_id);

            if (isset($cl)){
                $data[$i] = array(
                    'city'          => $cl->name,
                    'state'         => $cl->state->uf,
                    'id'            => $cl->id,
                    'user_count'    => $usrs->count(),
                    'total'         => $total,
                    'users'         => array(),
                    'orders_count'  => 0
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
            $data[$i]['users_count']   =   $users_count;
        }


        $data = collect($data)->sortBy('total')->reverse()->toArray();

        return Inertia::render('Report/City/Sales',[
            'data'       =>$data,
            'month'      =>date('m'),

        ]);
    }

    public function month_sales($year = NULL, $month=NULL ){

        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }


        $users = User::ofOrdersYearAndMonth($year,$month)->get();
        $cities = $users->unique('city_id');
        $data = array();



        foreach ($cities as $i => $city){
            $total = 0;
            $usrs = User::ofOrdersCityYearAndMonth($city->city_id,$year,$month)->get();

            foreach ($usrs as $usr){
                foreach ($usr->orders->where('status',2)->where('ano',$year)->where('mes',$month) as $order){
                    $total = $total + $order->total;
                }
            }


            $cl = City::find($city->city_id);

            if (isset($cl)){
                $data[$i] = array(
                    'city'          => $cl->name,
                    'state'         => $cl->state->uf,
                    'id'            => $cl->id,
                    'user_count'    => $usrs->count(),
                    'total'         => $total,
                    'users'         => array(),
                    'orders_count'  => 0
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
            $data[$i]['users_count']   =   $users_count;
        }


        $data = collect($data)->sortBy('total')->reverse()->toArray();

        return Inertia::render('Report/City/Sales',[
            'data'       =>$data,
            'month'      =>date('m'),

        ]);
    }

    public function month_quantity($year = NULL, $month=NULL ){

        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }


        $users = User::ofOrdersYearAndMonth($year,$month)->get();
        $cities = $users->unique('city_id');
        $data = array();



        foreach ($cities as $i => $city){
            $total = 0;
            $usrs = User::ofOrdersCityYearAndMonth($city->city_id,$year,$month)->get();

            foreach ($usrs as $usr){
                foreach ($usr->orders->where('status',2)->where('ano',$year)->where('mes',$month) as $order){
                    $total = $total + $order->total;
                }
            }


            $cl = City::find($city->city_id);

            if (isset($cl)){
                $data[$i] = array(
                    'city'          => $cl->name,
                    'state'         => $cl->state->uf,
                    'id'            => $cl->id,
                    'user_count'    => $usrs->count(),
                    'total'         => $total,
                    'users'         => array(),
                    'orders_count'  => 0
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
            $data[$i]['users_count']   =   $users_count;
        }


        $data = collect($data)->sortBy('user_count')->reverse()->toArray();

        return Inertia::render('Report/City/Quantity',[
            'data'       =>$data,
            'month'      =>date('m'),

        ]);
    }

    public function year_quantity($year = NULL ){

        if ($year == NULL){
            $year = date('Y');
        }
        $users = User::ofOrdersYear($year)->get();
        $cities = $users->unique('city_id');
        $data = array();



        foreach ($cities as $i => $city){
            $total = 0;
            $usrs = User::ofOrdersCityYear($city->city_id,$year)->get();

            foreach ($usrs as $usr){
                foreach ($usr->orders->where('status',2)->where('ano',$year) as $order){
                    $total = $total + $order->total;
                }
            }


            $cl = City::find($city->city_id);

            if (isset($cl)){
                $data[$i] = array(
                    'city'          => $cl->name,
                    'state'         => $cl->state->uf,
                    'id'            => $cl->id,
                    'user_count'    => $usrs->count(),
                    'total'         => $total,
                    'users'         => array(),
                    'orders_count'  => 0
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
            $data[$i]['users_count']   =   $users_count;
        }


        $data = collect($data)->sortBy('user_count')->reverse()->toArray();

        return Inertia::render('Report/City/Quantity',[
            'data'       =>$data,
            'month'      =>date('m'),

        ]);
    }

}
