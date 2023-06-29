<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product extends Model
{

    protected $table = 'products';
    protected $fillable =[
        'id',
        'jewel_id',
        'ouro_id',
        'category_id',
        'collection_id',
        'codigo',
        'peso',
        'cor',
        'name',
        'description',
        'recommended',
        'featured',
        'line_up',
        'destaque',
        'prazo',
        'publish',
        'sale',
        'slug',
        'peso_18k',
        'peso_fino',
        'sku',
        'ncm',
        'ean',
        'tiny_id',






    ];

    public function name(): Attribute
    {
        return new Attribute(
            get: fn ($value) => strtoupper($value),
            set: fn ($value) => strtoupper($value),
        );
    }

    public function description(): Attribute
    {
        return new Attribute(
            get: fn ($value) => strtoupper($value),
            set: fn ($value) => strtoupper($value),
        );
    }


    public function category()
    {
        return $this->belongsTo(Category::class);

    }
    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }
    public function jewel()
    {
        return $this->belongsTo(Jewel::class);
    }
    public function images()
    {
        return $this->hasMany(ProductImages::class);
    }

    public function golds()
    {
        return $this->hasMany(ProductGold::class,'product_id');
    }

    public function gems()
    {
        return $this->hasMany(ProductGem::class,'product_id');
    }

    public function stock()
    {
        return $this->hasOne(Stock::class);

    }
    public function stock_in()
    {
        return $this->hasMany(StockIn::class);

    }

    public function order_items()
    {
        return $this->hasMany(OrderItems::class);
    }



    public function scopeOfSearch($query, $search)
    {
        return $query->where('name', 'LIKE', '%' . $search . '%')
            ->orWhere('id', 'LIKE', '%' . $search . '%')
            ->with('images','stock','jewel')
            ->with(['golds.gold'])
            ->with(['gems.gem']);
    }

    public function scopeOfOrders($query)
    {
        return $query->whereHas('order_items', function ($query)  {
            $query->whereHas('order', function ($query){
                $query->where('status' , 2);
            });
        });
    }

    public function scopeOfOrdersYear($query,$year)
    {
        return $query->whereHas('order_items', function ($query) use ($year) {
            $query->whereHas('order', function ($query) use ($year){
                $query->where('status' , 2)->where('ano' , $year);
            });
        });
    }

    public function scopeOfOrdersYearAndMonth($query,$year,$month)
    {
        return $query->whereHas('order_items', function ($query) use ($year, $month) {
            $query->whereHas('order', function ($query) use ($year, $month){
                $query->where('status' , 2)->where('ano' , $year)->where('mes' , $month);
            });
        });
    }

    public function scopeOfOrdersCollection($query, $collection)
    {
        return $query->whereHas('order_items', function ($query) {
            $query->whereHas('order', function ($query){
                $query->where('status' , 2);
            });
        })->where('collection_id', $collection);
    }


    public function scopeOfOrdersCollectionYear($query, $collection,$year)
    {
        return $query->whereHas('order_items', function ($query) use ($year) {
            $query->whereHas('order', function ($query) use ($year){
                $query->where('status' , 2)->where('ano' , $year);
            });
        })->where('collection_id', $collection);
    }

    public function scopeOfOrdersCollectionYearAndMonth($query, $collection,$year,$month)
    {
        return $query->whereHas('order_items', function ($query) use ($year,$month) {
            $query->whereHas('order', function ($query) use ($year,$month){
                $query->where('status' , 2)->where('ano' , $year)->where('mes' , $month);
            });
        })->where('collection_id', $collection);
    }
    public function scopeOfOrdersCategoryYear($query, $category,$year)
    {
        return $query->whereHas('order_items', function ($query) use ($year) {
            $query->whereHas('order', function ($query) use ($year){
                $query->where('status' , 2)->where('ano' , $year);
            });
        })->where('category_id', $category);
    }

    public function scopeOfOrdersCategoryYearAndMonth($query, $category,$year,$month)
    {
        return $query->whereHas('order_items', function ($query) use ($year,$month) {
            $query->whereHas('order', function ($query) use ($year,$month){
                $query->where('status' , 2)->where('ano' , $year)->where('mes' , $month);
            });
        })->where('category_id', $category);
    }



    //API------------------------------------------------------------------------------------



    public function scopeOfApiOrders($query,$center)
    {
        return $query->whereHas('order_items', function ($query) use ($center)  {
            $query->whereHas('order', function ($query) use ($center){
                $query->where('status' , 2)->where('centro' , $center);
            });
        });
    }

    public function scopeOfApiOrdersYear($query,$year,$center)
    {
        return $query->whereHas('order_items', function ($query) use ($year,$center) {
            $query->whereHas('order', function ($query) use ($year,$center){
                $query->where('status' , 2)->where('ano' , $year)->where('centro' , $center);
            });
        });
    }

    public function scopeOfApiOrdersYearAndMonth($query,$year,$month, $center)
    {
        return $query->whereHas('order_items', function ($query) use ($year, $month , $center) {
            $query->whereHas('order', function ($query) use ($year, $month , $center){
                $query->where('status' , 2)->where('ano' , $year)->where('mes' , $month)->where('centro' , $center);
            });
        });
    }

    public function scopeOfApiOrdersCollection($query, $collection,$center)
    {
        return $query->whereHas('order_items', function ($query) use ($center) {
            $query->whereHas('order', function ($query) use ($center){
                $query->where('status' , 2)->where('centro' , $center);
            });
        })->where('collection_id', $collection);
    }


    public function scopeOfApiOrdersCollectionYear($query, $collection,$year, $center)
    {
        return $query->whereHas('order_items', function ($query) use ($year , $center) {
            $query->whereHas('order', function ($query) use ($year, $center){
                $query->where('status' , 2)->where('ano' , $year)->where('centro' , $center);
            });
        })->where('collection_id', $collection);
    }

    public function scopeOfApiOrdersCollectionYearAndMonth($query, $collection,$year,$month, $center)
    {
        return $query->whereHas('order_items', function ($query) use ($year,$month,$center) {
            $query->whereHas('order', function ($query) use ($year,$month,$center){
                $query->where('status' , 2)->where('ano' , $year)->where('mes' , $month)->where('centro' , $center);
            });
        })->where('collection_id', $collection);
    }
    public function scopeOfApiOrdersCategoryYear($query, $category,$year,$center)
    {
        return $query->whereHas('order_items', function ($query) use ($year,$center) {
            $query->whereHas('order', function ($query) use ($year,$center){
                $query->where('status' , 2)->where('ano' , $year)->where('centro' , $center);
            });
        })->where('category_id', $category);
    }

    public function scopeOfApiOrdersCategoryYearAndMonth($query, $category,$year,$month,$center)
    {
        return $query->whereHas('order_items', function ($query) use ($year,$month,$center) {
            $query->whereHas('order', function ($query) use ($year,$month,$center){
                $query->where('status' , 2)->where('ano' , $year)->where('mes' , $month)->where('centro' , $center);
            });
        })->where('category_id', $category);
    }
}
