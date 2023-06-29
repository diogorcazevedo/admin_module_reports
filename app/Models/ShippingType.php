<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingType extends Model
{


    protected $table = 'order_shipping_type';


    protected $fillable =[

        'name',

    ];


    public function shippings()
    {
        return $this->belongsTo(Shippings::class);
    }

}
