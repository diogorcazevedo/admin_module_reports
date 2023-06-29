<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{

    protected $table = 'order_entregas';


    protected $fillable =[
        'product_id',
        'order_id',
        'operador_estoque_id',
        'user_id',
        'servico_id',
        'fabricacao_id',
        'ordem_item_id',
        'price',
        'qtd',
        'data_entrega',
        'shipping_type_id',
        'data_envio',
        'data_previsao',
        'previsao_envio',
        'cod_rastreio',
        'entregue',
        'estoque',
        'obs',
    ];


    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function shipping_items()
    {
        return $this->hasMany(ShippingItems::class,'order_entrega_id');
    }

    public function sigepe()
    {
        return $this->hasOne(Sigepe::class,'entrega_id');
    }

    public function tracks()
    {
        return $this->hasMany(SigepeTrack::class,'entrega_id');
    }
}
