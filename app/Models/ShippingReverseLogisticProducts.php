<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShippingReverseLogisticProducts extends Model
{

    protected $table = 'transporte_reverso_produtos';


    protected $fillable =[
        'transporte_reverso_id',
        'operador_id',
        'product_id',
        'user_id',
        'servico_id',
        'fabricacao_id',
        'descricao',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class,'product_id');
    }

    public function servico()
    {
        return $this->belongsTo(Company::class,'servico_id');
    }

    public function fabricacao()
    {
        return $this->belongsTo(Company::class,'fabricacao_id');
    }



}
