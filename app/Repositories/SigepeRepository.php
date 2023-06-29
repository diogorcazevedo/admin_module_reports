<?php

namespace App\Repositories;


use App\Models\ShippingSigepe;
use App\Models\Sigepe;

class SigepeRepository
{


    public function store($data,$etiqueta_salvar)
    {

        $sigepe = new Sigepe();
        $sigepe->etiqueta         = $etiqueta_salvar;
        $sigepe->user_id          = auth()->user()->id;
        $sigepe->destinatario     = $data['destinatario'];
        $sigepe->dimensao         = $data['dimensao'];
        $sigepe->zipcode          = $data['zipcode'];
        $sigepe->address          = $data['address'];
        $sigepe->number           = $data['number'];
        $sigepe->neighborhood     = $data['neighborhood'];
        $sigepe->complement       = $data['complement'];
        $sigepe->city             = $data['city'];
        $sigepe->state            = $data['state'];
        $sigepe->save();

        return $sigepe;
    }

    public function shipping($data,$target,$shipping)
    {

        $sigepe = new ShippingSigepe();
        $sigepe->order_id         = $data['order_id'];
        $sigepe->user_id          = $data['user_id'];
        $sigepe->entrega_id       = $shipping->id;
        $sigepe->etiqueta         = $target;
        $sigepe->destinatario     = $data['destinatario'];
        $sigepe->dimensao         = $data['dimensao'];
        $sigepe->zipcode          = $data['zipcode'];
        $sigepe->address          = $data['address'];
        $sigepe->number           = $data['number'];
        $sigepe->neighborhood     = $data['neighborhood'];
        $sigepe->complement       = $data['complement'];
        $sigepe->city             = $data['city'];
        $sigepe->state            = $data['state'];
        $sigepe->save();

        return $sigepe;
    }
}
