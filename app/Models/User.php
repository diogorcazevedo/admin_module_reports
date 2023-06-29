<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function name(): Attribute
    {
        return new Attribute(
            get: fn ($value) => strtoupper($value),
            set: fn ($value) => strtoupper($value),
        );
    }

    public function cel(): Attribute
    {
        return new Attribute(
            get: fn ($value) => trim(limpa_cel($value)),
            set: fn ($value) => trim(limpa_cel($value)),
        );
    }

    public function orders()
    {
        return $this->hasMany(Order::class);

    }
    public function city()
    {
        return $this->belongsTo(City::class);

    }

    public function state()
    {
        return $this->belongsTo(State::class);

    }

    public function seller_orders()
    {
        return $this->hasMany(Order::class, 'vendedor');
    }


    public function images()
    {
        return $this->hasMany(UserImages::class);
    }

    public function scopeOfOrdersCollectionYear($query, $collection,$year)
    {
        return $query->whereHas('orders', function ($query) use ($year,$collection) {
                        $query->where('status' , 2)
                                ->where('ano' , $year)
                                ->whereHas('items', function ($query) use ($collection){
                                    $query->whereHas('product', function ($query) use ($collection){
                                                $query->where('collection_id' , $collection);
                                            });
                    });
                });
    }

    public function scopeOfOrdersCollectionYearAndMonth($query, $collection,$year,$month)
    {
        return $query->whereHas('orders', function ($query) use ($year,$month,$collection) {
            $query->where('status' , 2)
                ->where('ano' , $year)
                ->where('mes' , $month)
                ->whereHas('items', function ($query) use ($collection){
                    $query->whereHas('product', function ($query) use ($collection){
                        $query->where('collection_id' , $collection);
                    });
                });
        });
    }

    public function scopeOfOrdersCategoryYear($query, $category,$year)
    {
        return $query->whereHas('orders', function ($query) use ($year,$category) {
            $query->where('status' , 2)
                ->where('ano' , $year)
                ->whereHas('items', function ($query) use ($category){
                    $query->whereHas('product', function ($query) use ($category){
                        $query->where('category_id' , $category);
                    });
                });
        });
    }

    public function scopeOfOrdersCategoryYearAndMonth($query, $category,$year,$month)
    {
        return $query->whereHas('orders', function ($query) use ($year,$month,$category) {
            $query->where('status' , 2)
                ->where('ano' , $year)
                ->where('mes' , $month)
                ->whereHas('items', function ($query) use ($category){
                    $query->whereHas('product', function ($query) use ($category){
                        $query->where('category_id' , $category);
                    });
                });
        });
    }


    public function scopeOfOrders($query)
    {
        return $query->whereHas('orders', function ($query) {
            $query->where('status' , 2);
        })->orderBy('name','asc');

    }

    public function scopeOfOrdersYear($query,$year)
    {
        return $query->whereHas('orders', function ($query) use ($year) {
            $query->where('status' , 2)->where('ano' , $year);
        });

    }

    public function scopeOfOrdersYearAndMonth($query,$year,$month)
    {
        return $query->whereHas('orders', function ($query) use ($year, $month) {
            $query->where('status' , 2)->where('ano' , $year)->where('mes' , $month);
        });
    }

    public function scopeOfSearch($query, $search)
    {
        return $query->where('name', 'LIKE', '%' . $search . '%')
            ->orWhere('id', 'LIKE', '%' . $search . '%');
    }


    public function scopeOfSellerOrdersYear($query)
    {
        return $query->whereHas('seller_orders', function ($query) {
            $query->where('status', 2);
        })->orderBy('name','asc');

    }

    public function scopeOfSellerOrdersYearAndMonth($query,$year,$month)
    {
        return $query->whereHas('seller_orders', function ($query) use($year,$month) {
            $query->where('status', 2)->where('ano',$year)->where('mes',$month);
        })->orderBy('name','asc');

    }

    public function scopeOfOrdersStatesYear($query, $state,$year)
    {
        return $query->whereHas('orders', function ($query) use($year) {
            $query->where('status', 2)->where('ano',$year);
        })->where('state_id', $state);
    }
    public function scopeOfOrdersStatesYearAndMonth($query, $state,$year,$month)
    {
        return $query->whereHas('orders', function ($query) use($year,$month) {
            $query->where('status', 2)->where('ano',$year)->where('mes',$month);
        })->where('state_id', $state);
    }


    public function scopeOfOrdersCities($query, $city)
    {
        return $query->whereHas('orders', function ($query) {
            $query->where('status', 2);
        })->where('city_id', $city);
    }

    public function scopeOfOrdersCityYear($query, $city,$year)
    {
        return $query->whereHas('orders', function ($query) use($year) {
            $query->where('status', 2)->where('ano',$year);
        })->where('city_id', $city);
    }
    public function scopeOfOrdersCityYearAndMonth($query, $city,$year,$month)
    {
        return $query->whereHas('orders', function ($query) use($year,$month) {
            $query->where('status', 2)->where('ano',$year)->where('mes',$month);
        })->where('city_id', $city);
    }



    //API ----------------------------------------------------------------------------------------------

    public function scopeOfApiOrdersCollectionYear($query, $collection,$year, $center)
    {
        return $query->whereHas('orders', function ($query) use ($year,$collection,$center) {
            $query->where('status' , 2)
                ->where('ano' , $year)
                ->where('centro' , $center)
                ->whereHas('items', function ($query) use ($collection){
                    $query->whereHas('product', function ($query) use ($collection){
                        $query->where('collection_id' , $collection);
                    });
                });
        });
    }

    public function scopeOfApiOrdersCollectionYearAndMonth($query, $collection,$year,$month)
    {
        return $query->whereHas('orders', function ($query) use ($year,$month,$collection,$center) {
            $query->where('status' , 2)
                ->where('ano' , $year)
                ->where('mes' , $month)
                ->where('centro' , $center)
                ->whereHas('items', function ($query) use ($collection){
                    $query->whereHas('product', function ($query) use ($collection){
                        $query->where('collection_id' , $collection);
                    });
                });
        });
    }

    public function scopeOfApiOrdersCategoryYear($query, $category,$year,$center)
    {
        return $query->whereHas('orders', function ($query) use ($year,$category,$center) {
            $query->where('status' , 2)
                ->where('ano' , $year)
                ->where('centro' , $center)
                ->whereHas('items', function ($query) use ($category){
                    $query->whereHas('product', function ($query) use ($category){
                        $query->where('category_id' , $category);
                    });
                });
        });
    }

    public function scopeOfApiOrdersCategoryYearAndMonth($query, $category,$year,$month,$center)
    {
        return $query->whereHas('orders', function ($query) use ($year,$month,$category,$center) {
            $query->where('status' , 2)
                ->where('ano' , $year)
                ->where('mes' , $month)
                ->where('centro' , $center)
                ->whereHas('items', function ($query) use ($category){
                    $query->whereHas('product', function ($query) use ($category){
                        $query->where('category_id' , $category);
                    });
                });
        });
    }


    public function scopeOfApiOrders($query,$center)
    {
        return $query->whereHas('orders', function ($query) use($center) {
            $query->where('status' , 2)->where('centro' , $center);
        })->orderBy('name','asc');

    }

    public function scopeOfApiOrdersYear($query,$year,$center)
    {
        return $query->whereHas('orders', function ($query) use ($year,$center) {
            $query->where('status' , 2)->where('ano' , $year)->where('centro' , $center);
        });

    }

    public function scopeOfApiOrdersYearAndMonth($query,$year,$month,$center)
    {
        return $query->whereHas('orders', function ($query) use ($year, $month,$center) {
            $query->where('status' , 2)->where('ano' , $year)->where('mes' , $month)->where('centro' , $center);
        });
    }

    public function scopeOfApiSellerOrdersYear($query,$center)
    {
        return $query->whereHas('seller_orders', function ($query) use ($center) {
            $query->where('status', 2)->where('centro', $center);
        })->orderBy('name','asc');

    }

    public function scopeOfApiSellerOrdersYearAndMonth($query,$year,$month,$center)
    {
        return $query->whereHas('seller_orders', function ($query) use($year,$month,$center) {
            $query->where('status', 2)->where('ano',$year)->where('mes',$month)->where('centro',$center);
        })->orderBy('name','asc');

    }

    public function scopeOfApiOrdersStatesYear($query, $state,$year,$center)
    {
        return $query->whereHas('orders', function ($query) use($year,$center) {
            $query->where('status', 2)->where('ano',$year)->where('centro',$center);
        })->where('state_id', $state);
    }
    public function scopeOfApiOrdersStatesYearAndMonth($query, $state,$year,$month,$center)
    {
        return $query->whereHas('orders', function ($query) use($year,$month,$center) {
            $query->where('status', 2)->where('ano',$year)->where('mes',$month)->where('centro',$center);
        })->where('state_id', $state);
    }


    public function scopeOfApiOrdersCities($query, $city,$center)
    {
        return $query->whereHas('orders', function ($query) use ($center) {
            $query->where('status', 2)->where('centro', $center);
        })->where('city_id', $city);
    }

    public function scopeOfApiOrdersCityYear($query, $city,$year,$center)
    {
        return $query->whereHas('orders', function ($query) use($year,$center) {
            $query->where('status', 2)->where('ano',$year)->where('centro',$center);
        })->where('city_id', $city);
    }
    public function scopeOfApiOrdersCityYearAndMonth($query, $city,$year,$month,$center)
    {
        return $query->whereHas('orders', function ($query) use($year,$month,$center) {
            $query->where('status', 2)->where('ano',$year)->where('mes',$month)->where('centro',$center);
        })->where('city_id', $city);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
