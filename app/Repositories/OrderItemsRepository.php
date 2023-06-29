<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\OperadoraCartoes;
use App\Models\OrderItems;


class OrderItemsRepository
{

    public function store($order,$product,$aro1=null,$aro2=null)
    {
        OrderItems::create([
            'order_id'   =>$order->id,
            'product_id' =>$product->id,
            'price'      =>$product->stock->offered_price,
            'qtd'        =>1,
            'aro1'       =>$aro1,
            'aro2'       =>$aro2,
            'img_url'    =>$product->images->first()->id.'.'.$product->images->first()->extension,
        ]);

        return $order;
    }


}
