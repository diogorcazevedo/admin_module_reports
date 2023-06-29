<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShippingReverseLogistic extends Model
{

    protected $table = 'transporte_reverso';


    protected $fillable =[
        'operador_id',
        'user_id',
        'order_id',

        'cod_reverso',
        'data_cliente_envio',
        'cod_cliente_rastreio',
        'data_cliente_chegada',


        'data_cb_envio',
        'data_cb_chegada',
        'cod_cb_rastreio',

        'price',
        'obs',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function items()
    {
        return $this->hasMany(ShippingReverseLogisticProducts::class,'transporte_reverso_id');
    }


}
