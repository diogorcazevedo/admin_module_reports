<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShippingSigepe extends Model
{

    protected $table = 'order_sigepe';


    protected $fillable =[
        'order_id',
        'destinatario',
        'user_id',
        'dimensao',
        'etiqueta',
        'zipcode',
        'address',
        'number',
        'neighborhood',
        'complement',
        'city',
        'state',
    ];


    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function ordem_item()
    {
        return $this->belongsTo(OrderItems::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function servico()
    {
        return $this->belongsTo(Company::class,'servico_id');
    }

    public function fabricacao()
    {
        return $this->belongsTo(Company::class,'fabricacao_id');
    }
    public function entrega()
    {
        return $this->hasOne(OrderEntregas::class,'sigepe_id');
    }
    public function rastreios()
    {
        return $this->hasMany(OrderSigepeAndamentos::class,'sigepe_id');
    }

}
