<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShippingItems extends Model
{

    //use SoftDeletes;
  //  protected $dates = ['deleted_at'];
    protected $table = 'order_entrega_items';


    protected $fillable =[
        'order_entrega_id',
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
    public function stock_transferencia()
    {
        return $this->hasMany(OrderStockTransferencia::class,'order_entrega_id');
    }
    public function stock_pedido_produto()
    {
        return $this->hasMany(OrderStockPedidoProduto::class,'order_entrega_id');
    }
}
