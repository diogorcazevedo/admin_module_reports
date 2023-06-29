<?php

namespace App\Repositories;

use App\Models\Order;

class ShippingRepository
{

    public function openShippingByCenter($center){
        return Order::where('centro', $center)
                    ->where('entregue',NULL)
                    ->where('status',2)
                    ->with('user','ponto','seller')
                       ->with(['items'=>function($q){
                           $q->with(['product'=>function($q){
                               $q->with('images');
                           }]);
                       }])->get();
    }


    public function openShippingByNotInCenters(){

        return Order::where('entregue',NULL)
                    ->where('status',2)
                    ->whereNotIn('centro', ["2", "4", "13"])
                    ->with('user','ponto','seller')
                    ->with(['items'=>function($q){
                        $q->with(['product'=>function($q){
                            $q->with('images');
                        }]);
                    }])->get();

    }
}
