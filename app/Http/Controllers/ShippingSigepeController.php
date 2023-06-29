<?php

namespace App\Http\Controllers;

use App\Http\Services\ShippingService;
use App\Http\Services\SigepeService;
use App\Models\Order;
use App\Models\Product;
use App\Models\ShippingItems;
use App\Models\Shipping;
use App\Models\ShippingSigepe;
use App\Models\ShippingType;
use App\Models\Sigepe;
use App\Models\User;
use App\Repositories\SigepeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;


class ShippingSigepeController extends Controller
{

    private ShippingService $shippingService;
    private SigepeService $sigepeService;
    private SigepeRepository $sigepeRepository;

    public function __construct(ShippingService $shippingService,
                                SigepeService $sigepeService,
                                SigepeRepository $sigepeRepository)
    {

        $this->shippingService = $shippingService;
        $this->sigepeService = $sigepeService;
        $this->sigepeRepository = $sigepeRepository;
    }



    public function index(Order $order)
    {
        $sigepes =ShippingSigepe::where('order_id',$order->id)->get();
        $user =User::where('id',$order->user_id)->with('city','state')->first();

        return Inertia::render('Shipping/Sigepes',[
            'sigepes'=>$sigepes,
            'user'=>$user,
            'order'=>$order,
        ]);

    }

    public function store(Request $request, Order $order){

        $request->validate([
            'products'       => 'required',
        ]);

        $data = $request->all();

        $shipping = $this->shippingService->store($order,$data);
        $this->shippingService->storeItems($order,$data,$shipping);
        $target = $this->sigepeService->store($data);
        $this->sigepeRepository->shipping($data,$target,$shipping);
        $shipping = Shipping::find($shipping->id);
        $shipping->cod_rastreio = $target;
        $shipping->save();
        return redirect()->route('shipping.sigepe.index',['order'=>$order->id])->with('message', 'Operação realizada com sucesso');

    }



    }
