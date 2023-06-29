<?php
/**
 * Created by PhpStorm.
 * User: diogoazevedo
 * Date: 23/11/15
 * Time: 22:30
 */

namespace App\Http\Services;


use App\Models\Shipping;
use App\Models\ShippingItems;


class ShippingService
{

    public function store($order,$data){

        $shipping = Shipping::create([
            'order_id'          =>$order->id,
            'user_id'           =>$order->user_id,
            'shipping_type_id'  =>$data['type_id'],
            'previsao_envio'    =>data_reverse_traco($data['previsao_envio']),
            'cod_rastreio'      => $data['cod_rastreio'] ?? null,
            'obs'               =>$data['obs'],
        ]);

        return $shipping;
    }

    public function storeItems($order,$data,$shipping){

        foreach ( $data['products'] as $p){

            ShippingItems::create([
                'order_id'          =>$order->id,
                'order_entrega_id'  =>$shipping->id,
                'product_id'        =>$p,
                'user_id'           =>$order->user_id,
            ]);
        }

    }

    public function update($shipping, $data){



        $shipping->obs              = $data['obs'];
        $shipping->previsao_envio   =  data_reverse_traco($data['previsao_envio']);
        // $shipping->shipping_type_id = $data['type_id'];
        //$shipping->previsao_entrega =  ($data['previsao_entrega'] != '' || $data['previsao_entrega'] != null) ? data_reverse_traco($data['previsao_entrega']):null;
        $shipping->data_envio       =  ($data['data_envio'] != '' || $data['data_envio'] != null) ? data_reverse_traco($data['data_envio']):null;
        $shipping->data_entrega     =  ($data['data_entrega'] != '' || $data['data_entrega'] != null) ? data_reverse_traco($data['data_entrega']):null;
        $shipping->cod_rastreio     =  $data['cod_rastreio'];
        $shipping->save();


    }

}
