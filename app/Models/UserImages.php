<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserImages extends Model
{

    protected $table="user_images";
    protected $fillable = [
        'type','image_type_id','extension','user_id','path','system'
    ];


    public function imageType()
    {
        return $this->belongsTo(ImageType::class,'image_type_id','id');
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
