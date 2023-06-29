<?php

namespace App\Http\Controllers\Report;



use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;


class ReportCollectionController extends Controller
{



    public function index(){

        $year = date('Y');
        $month = date("m");


        return Inertia::render('Report/Collection/Index',[
         //   'orders'=>$orders,
        //    'total'=>$total,
        ]);
    }
    public function year_sales($year = NULL ){

        if ($year == NULL){
            $year = date('Y');
        }

        $products = Product::ofOrdersYear($year)->get();
        $collections = $products->unique('collection_id');
        $data = array();
        $sales_total = 0;

        foreach ($collections as $i => $collection){

            $products   = Product::ofOrdersCollectionYear($collection->collection_id,$year)->get();
            $users      = User::ofOrdersCollectionYear($collection->collection_id,$year)->get();
            $cl         = Collection::find($collection->collection_id);

            $data[$i] = array(
                'collection'        => $cl->name,
                'id'                => $cl->id,
                'pd'                => $pd = array(),
                'users'             => $user = array(),
                'collection_total'  => 0,
                'orders_count'      => 0
            );
            $collection_total = 0;
            $orders_count = 0;

            foreach ($products as $k => $product) {
                $total  = 0;
                $count_orders  = 0;
                foreach ($product->order_items as $order_item){
                    if (isset($order_item->order)){
                        if ($order_item->order->status == 2){
                            if ($order_item->order->ano == $year){
                                $total = $total + $order_item->price;
                                $count_orders = $count_orders + 1;
                            }
                        }
                    }
                }
                $data[$i]['pd'][$k] =
                    [
                        'product'       => $product->name,
                        'orders'        => $product->order_items->where("order.ano",$year)->count(),
                        'total'         => $total,
                    ];
                $collection_total   = $collection_total + $total;
                $orders_count       = $orders_count + $count_orders;
                $sales_total        = $sales_total +$total;
            }

            foreach ($users as $k => $user) {
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
                        'total'         => $total,
                        'count_items'   => $count_items,
                    ];
                $users_count            = $orders_count + $count_users;
            }


            $data[$i]['collection_total']   =   $collection_total;
            $data[$i]['orders_count']       =   $orders_count;
            $data[$i]['users_count']        =   $users_count;
        }

        $data = collect($data)->sortBy('collection_total')->reverse()->toArray();

        return Inertia::render('Report/Collection/Sales',[
            'data'              =>$data,
            'month'             =>date('m'),
            'sales_total'       =>$sales_total,

        ]);
    }
    public function year_quantity($year = NULL ){

        if ($year == NULL){
            $year = date('Y');
        }

        $products = Product::ofOrdersYear($year)->get();
        $collections = $products->unique('collection_id');
        $data = array();
        $sales_total = 0;

        foreach ($collections as $i => $collection){

            $products   = Product::ofOrdersCollectionYear($collection->collection_id,$year)->get();
            $users      = User::ofOrdersCollectionYear($collection->collection_id,$year)->get();
            $cl         = Collection::find($collection->collection_id);

            $data[$i] = array(
                'collection'        => $cl->name,
                'id'                => $cl->id,
                'pd'                => $pd = array(),
                'users'             => $user = array(),
                'collection_total'  => 0,
                'orders_count'      => 0
            );
            $collection_total = 0;
            $orders_count = 0;

            foreach ($products as $k => $product) {
                $total  = 0;
                $count_orders  = 0;
                foreach ($product->order_items as $order_item){
                    if (isset($order_item->order)){
                        if ($order_item->order->status == 2){
                            if ($order_item->order->ano == $year){
                                $total = $total + $order_item->price;
                                $count_orders = $count_orders + 1;
                            }
                        }
                    }
                }
                $data[$i]['pd'][$k] =
                    [
                        'product'       => $product->name,
                        'orders'        => $product->order_items->where("order.ano",$year)->count(),
                        'total'         => $total,
                    ];
                $collection_total   = $collection_total + $total;
                $orders_count       = $orders_count + $count_orders;
                $sales_total        = $sales_total +$total;
            }

            foreach ($users as $k => $user) {
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
                        'total'         => $total,
                        'count_items'   => $count_items,
                    ];
                $users_count            = $orders_count + $count_users;
            }


            $data[$i]['collection_total']   =   $collection_total;
            $data[$i]['orders_count']       =   $orders_count;
            $data[$i]['users_count']        =   $users_count;
        }

        $data = collect($data)->sortBy('orders_count')->reverse()->toArray();

        return Inertia::render('Report/Collection/Quantity',[
            'data'              =>$data,
            'month'             =>date('m'),
            'sales_total'       =>$sales_total,

        ]);
    }

    public function month_sales($year = NULL, $month = NULL ){
        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }

        $products = Product::ofOrdersYearAndMonth($year,$month)->get();
        $collections = $products->unique('collection_id');
        $data = array();
        $sales_total = 0;

        foreach ($collections as $i => $collection){

            $products   = Product::ofOrdersCollectionYearAndMonth($collection->collection_id,$year,$month)->get();
            $users      = User::ofOrdersCollectionYearAndMonth($collection->collection_id,$year,$month)->get();
            $cl         = Collection::find($collection->collection_id);

            $data[$i] = array(
                'collection'        => $cl->name,
                'id'                => $cl->id,
                'pd'                => $pd = array(),
                'users'             => $user = array(),
                'collection_total'  => 0,
                'orders_count'      => 0
            );

            $collection_total = 0;
            $orders_count = 0;

            foreach ($products as $k => $product) {
                $total  = 0;
                $count_orders  = 0;
                foreach ($product->order_items as $p => $order_item){
                    if (isset($order_item->order)){
                        if ($order_item->order->status == 2){
                            if ($order_item->order->ano == $year AND $order_item->order->mes == $month){
                                $total = $total + $order_item->price;
                                $count_orders = $count_orders + 1;
                                $data[$i]['pd'][$p] =
                                    [
                                        'product'       => $product->name,
                                        'orders'        => $count_orders,
                                        'total'         => $total,
                                    ];
                            }
                        }
                    }
                }

                $collection_total   = $collection_total + $total;
                $orders_count       = $orders_count + $count_orders;
                $sales_total        = $sales_total +$total;
            }

            foreach ($users as $k => $user) {
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
                        'total'         => $total,
                        'count_items'   => $count_items,
                    ];
                $users_count            = $orders_count + $count_users;
            }


            $data[$i]['collection_total']   =   $collection_total;
            $data[$i]['orders_count']       =   $orders_count;
            $data[$i]['users_count']        =   $users_count;

        }

        $data = collect($data)->sortBy('collection_total')->reverse()->toArray();

        return Inertia::render('Report/Collection/Sales',[
            'data'              =>$data,
            'month'             =>date('m'),
            'sales_total'       =>$sales_total,

        ]);
    }

    public function month_quantity($year = NULL, $month = NULL ){


        if($month == NULL){
            $month = date('m');
        }
        if ($year == NULL){
            $year = date('Y');
        }

        $products = Product::ofOrdersYearAndMonth($year,$month)->get();
        $collections = $products->unique('collection_id');
        $data = array();
        $sales_total = 0;

        foreach ($collections as $i => $collection){

            $products   = Product::ofOrdersCollectionYearAndMonth($collection->collection_id,$year,$month)->get();
            $users      = User::ofOrdersCollectionYearAndMonth($collection->collection_id,$year,$month)->get();
            $cl         = Collection::find($collection->collection_id);

            $data[$i] = array(
                'collection'        => $cl->name,
                'id'                => $cl->id,
                'pd'                => $pd = array(),
                'users'             => $user = array(),
                'collection_total'  => 0,
                'orders_count'      => 0
            );

            $collection_total = 0;
            $orders_count = 0;

            foreach ($products as $k => $product) {
                $total  = 0;
                $count_orders  = 0;
                foreach ($product->order_items as $p => $order_item){
                    if (isset($order_item->order)){
                        if ($order_item->order->status == 2){
                            if ($order_item->order->ano == $year AND $order_item->order->mes == $month){
                                $total = $total + $order_item->price;
                                $count_orders = $count_orders + 1;
                                $data[$i]['pd'][$p] =
                                    [
                                        'product'       => $product->name,
                                        'orders'        => $count_orders,
                                        'total'         => $total,
                                    ];
                            }
                        }
                    }
                }

                $collection_total   = $collection_total + $total;
                $orders_count       = $orders_count + $count_orders;
                $sales_total        = $sales_total +$total;
            }

            foreach ($users as $k => $user) {
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
                        'total'         => $total,
                        'count_items'   => $count_items,
                    ];
                $users_count            = $orders_count + $count_users;
            }


            $data[$i]['collection_total']   =   $collection_total;
            $data[$i]['orders_count']       =   $orders_count;
            $data[$i]['users_count']        =   $users_count;

        }

        $data = collect($data)->sortBy('orders_count')->reverse()->toArray();

        return Inertia::render('Report/Collection/Quantity',[
            'data'              =>$data,
            'month'             =>date('m'),
            'sales_total'       =>$sales_total,

        ]);
    }


}
