<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Order extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'user_id',
        'total',
        'canal',
        'origem',
        'vendedor',
        'operador',
        'status',
        'credito',
        'comissao',
        'desconto',
        'data',
        'pagamento',
        'parcelamento',
        'centro',
        'comissao_gestao',
        'notafiscal',
        'obs',
        'mes',
        'ano',
        'message',
        'tipo_entrega',
        'entregue',
        'cod_retorno',
        'previsao',
    ];



    public function user()
    {
        return $this->belongsTo(User::class);

    }

    public function sigepe()
    {
        return $this->hasMany(OrderSigepe::class);

    }
    public function ponto()
    {
        return $this->belongsTo(Centro::class,'centro','id');

    }
    public function entregas()
    {
        return $this->hasMany(OrderEntregas::class);
    }
    public function items()
    {
        return $this->hasMany(OrderItems::class);
    }
    public function payments()
    {
        return $this->hasMany(OrderData::class);
    }
    public function seller()
    {
        return $this->belongsTo(User::class,'vendedor','id');
    }

    public function scopeOfOrderByYear($query,$year)
    {
        return $query->where('ano',$year)
            ->where('status', 2)
            ->with('ponto')
            ->with('seller')
            ->with('user')
            ->with(['items' => function ($q) {
                $q->with(['product' => function ($q) {
                    $q->with('images');
                }]);
            }]);
    }

    public function scopeOfOrderByYearAndMonth($query,$year,$month)
    {
        return $query->where('ano',$year)
            ->where('mes', $month)
            ->where('status', 2)
            ->with('ponto')
            ->with('seller')
            ->with('user')
            ->with(['items' => function ($q) {
                $q->with(['product' => function ($q) {
                    $q->with('images');
                }]);
            }]);
    }


//API ---------------------------------------------------------------------------

    public function scopeOfApiOrderByYear($query,$year,$center)
    {
        return $query->where('ano',$year)
            ->where('status', 2)->where('centro', $center)
            ->with('ponto')
            ->with('seller')
            ->with('user')
            ->with(['items' => function ($q) {
                $q->with(['product' => function ($q) {
                    $q->with('images');
                }]);
            }]);
    }

    public function scopeOfApiOrderByYearAndMonth($query,$year,$month,$center)
    {
        return $query->where('ano',$year)
            ->where('mes', $month)->where('centro', $center)
            ->where('status', 2)
            ->with('ponto')
            ->with('seller')
            ->with('user')
            ->with(['items' => function ($q) {
                $q->with(['product' => function ($q) {
                    $q->with('images');
                }]);
            }]);
    }


}
