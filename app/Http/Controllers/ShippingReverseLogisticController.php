<?php

namespace App\Http\Controllers;

use App\Http\Services\ShippingService;
use App\Http\Services\SigepeService;
use App\Models\Order;
use App\Models\Product;
use App\Models\ShippingItems;
use App\Models\Shipping;
use App\Models\ShippingReverseLogistic;
use App\Models\ShippingReverseLogisticProducts;
use App\Models\ShippingSigepe;
use App\Models\ShippingType;
use App\Models\Sigepe;
use App\Models\User;
use App\Repositories\SigepeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;


class ShippingReverseLogisticController extends Controller
{

    private ShippingService $shippingService;
    private SigepeService $sigepeService;
    private SigepeRepository $sigepeRepository;
    private ShippingReverseLogistic $shippingReverseLogistic;

    public function __construct(ShippingService $shippingService,
                                SigepeService $sigepeService,
                                SigepeRepository $sigepeRepository,
                                ShippingReverseLogistic $shippingReverseLogistic)
    {

        $this->shippingService = $shippingService;
        $this->sigepeService = $sigepeService;
        $this->sigepeRepository = $sigepeRepository;
        $this->shippingReverseLogistic = $shippingReverseLogistic;
    }



    public function index()
    {
        $reverses =ShippingReverseLogistic::with('user')->orderBy('id','desc')->get();

        return Inertia::render('Reverse/Index',[
            'reverses'=>$reverses
        ]);

    }

    public function show(Order $order)
    {
        $reverses =ShippingReverseLogistic::where('order_id',$order->id)->with('items','user')->get();
        $user =User::where('id',$order->user_id)->with('city','state')->first();

        return Inertia::render('Shipping/Reverse',[
            'reverses'=>$reverses,
            'user'=>$user,
            'order'=>$order,
        ]);

    }


    public function store(Request $request)
    {
        $data = $request->all();

        $data['data_cliente_envio']     = isset($data['data_cliente_envio']) ? data_reverse_traco($data['data_cliente_envio']):NULL;
        $data['data_cliente_chegada']   = isset($data['data_cliente_chegada']) ? data_reverse_traco($data['data_cliente_chegada']):NULL;
        $data['data_cb_envio']          = isset($data['data_cb_envio']) ? data_reverse_traco($data['data_cb_envio']):NULL;
        $data['data_cb_chegada']        = isset($data['data_cb_chegada']) ? data_reverse_traco($data['data_cb_chegada']):NULL;


        $transporte_reverso             = $this->shippingReverseLogistic->create($data);


        foreach ( $data['products'] as $p){

            ShippingReverseLogisticProducts::create([
                'transporte_reverso_id'    =>$transporte_reverso->id,
                'product_id'                =>$p,
                'user_id'                   =>$data['user_id'],
                'operador_id'               =>auth()->user()->id,
            ]);
        }

        return redirect()->route('shipping.reverse.logistic.show',['order'=>$data['order_id']])->with('message', 'Operação realizada com sucesso');

    }



    public function update(Request $request, $id)
    {
        $data = $request->all();

        $data['data_cliente_envio']     = isset($data['data_cliente_envio'])?data_reverse_traco($data['data_cliente_envio']):NULL;
        $data['data_cliente_chegada']   = isset($data['data_cliente_chegada'])? data_reverse_traco($data['data_cliente_chegada']):NULL;
        $data['data_cb_envio']          = isset($data['data_cb_envio'])? data_reverse_traco($data['data_cb_envio']):NULL;
        $data['data_cb_chegada']        = isset($data['data_cb_chegada'])? data_reverse_traco($data['data_cb_chegada']):NULL;

        $transporte_reverso = $this->shippingReverseLogistic->find($id);
        $transporte_reverso->update($data);

        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }

    public function destroy($reverse)
    {
        $reverse = ShippingReverseLogistic::find($reverse);
        $reverse->delete();
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }



    }
