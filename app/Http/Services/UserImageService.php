<?php
/**
 * Created by PhpStorm.
 * User: diogoazevedo
 * Date: 23/11/15
 * Time: 22:30
 */

namespace App\Http\Services;


use App\Models\User;
use App\Models\UserImages;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class UserImageService
{



    public function __construct(UserRepository $userRepository)
    {


    }

        public function imageStore($request,$user){

            $data = $request->all();
            $data['user_id'] = $user->id;
            $data['system'] = 2;
            $image = UserImages::create($data);

            $file = $request->file('img');
            $extension =  $file->getClientOriginalExtension();
            Storage::disk('s3')->put("users/".$image->id.'.'.$extension,file_get_contents($file));

            $img = UserImages::find($image->id);
            $img->path = "users/".$img->id.'.'.$extension;
            $img->extension = $extension;
            $img->publish = '0';
            $img->save();

            $user = User::find($user->id);
            $user->avatar = "https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/users/".$img->id.'.'.$extension;
            $user->save();
        }

    public function imageDestroy($image)
    {
        $image = UserImages::find($image);

        if ($image->path != null){
            if(Storage::disk('s3')->exists($image->path)) {
                Storage::disk('s3')->delete($image->path);
            }
        }
        $image->delete();

        $user = User::find($image->user_id);
        $user->avatar = null;
        $user->save();

    }

}
