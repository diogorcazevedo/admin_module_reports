<?php


namespace App\Http\Services;


use App\Models\Shipping;
use App\Models\ShippingItems;


class OrderUpdateService
{

    private ShippingService $shippingService;

    public function __construct(ShippingService $shippingService)
    {
        $this->shippingService = $shippingService;
    }

    public function previsao($order, $data){

            $shipping_count = Shipping::where('order_id',$order->id)->count();

            if ($shipping_count < 1){
                $data =[
                    'order_id'          =>$order->id,
                    'user_id'           =>$order->user_id,
                    'shipping_type_id'  =>'3',
                    'type_id'           =>'3',
                    'previsao_envio'    =>$data['previsao'],
                    'cod_rastreio'      =>$data['cod_rastreio'] ?? null,
                    'obs'               =>$data['obs'] ?? null,
                ];
                $shipping = $this->shippingService->store($order,$data);
                foreach ($order->items as $item){
                    ShippingItems::create([
                        'order_id'          =>$order->id,
                        'order_entrega_id'  =>$shipping->id,
                        'product_id'        =>$item->product_id,
                        'user_id'           =>$order->user_id,
                    ]);
                }

            }else{

                $shipping                   = Shipping::where('order_id',$order->id)->first();
                $shipping->previsao_envio   = data_reverse_traco($data['previsao']);
                $shipping->save();
            }

    }
    public function entrega($order){
        $shipping_count = Shipping::where('order_id',$order->id)->count();
        if ($shipping_count >0){
            $shippings = Shipping::where('order_id',$order->id)->all();
            foreach ($shippings as $shipping){
                $shipping->entregue = 3;
                $shipping->save();
            }
        }
    }
}
