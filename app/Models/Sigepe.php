<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sigepe extends Model
{

    protected $table = 'sigepe';


    protected $fillable =[
        'destinatario',
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
    

}
