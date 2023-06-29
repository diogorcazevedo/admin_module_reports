<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SigepeTrack extends Model
{

    protected $table = 'order_sigepe_andamentos';


    protected $fillable =[
        'order_id',
        'entrega_id',
        'sigepe_id',
        'user_id',
        'tipo',
        'status',
        'data',
        'dataHora',
        'descricao',
        'recebedor',
        'detalhe',

    ];


    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function entrega()
    {
        return $this->belongsTo(OrderEntregas::class,'entrega_id');
    }
    public function sigepe()
    {
        return $this->belongsTo(OrderSigepe::class,'sigepe_id');
    }

}
