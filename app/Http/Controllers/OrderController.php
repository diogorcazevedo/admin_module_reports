<?php

namespace App\Http\Controllers;


use App\Http\Requests\OrderRequest;
use App\Http\Services\OrderUpdateService;
use App\Http\Services\ProductListService;
use App\Http\Services\ShippingService;
use App\Http\Services\UserService;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Order;
use App\Models\OrderData;
use App\Models\Product;
use App\Models\Shipping;
use App\Models\User;
use App\Models\OrderItems;
use Illuminate\Http\Request;
use Inertia\Inertia;


class OrderController extends Controller
{

    /**
     * @var UserService
     */
    private $userService;

    /**
     * @var ProductListService
     */
    private $productListService;


    public function __construct(UserService $userService,
                                ProductListService $productListService,
                                )

    {
        $this->userService = $userService;
        $this->productListService = $productListService;
    }


    public function client(Request $request)
    {
        $search = $request->input('search');
        $users = $this->userService->filter($search);

        return Inertia::render('Orders/Client',[
            'users'=>$users,
            'search'=>$search,
        ]);

    }

    public function store(User $user)
    {

        $order = Order::create([
            'user_id'       =>$user->id,
            'vendedor'      =>auth()->user()->id,
            'operador'      =>auth()->user()->id,
            'total'         => NULL,
            'origem'        => 1,
            'centro'        => 1
        ]);

        return redirect()->route('order.product',['order'=>$order->id])->with('message', 'Operação realizada com sucesso');
    }

    public function product(Request $request,Order $order,$collection = null,$category = null)
    {

        $search         = $request->input('search');
        $products       = $this->productListService->filter($search,$collection,$category);
        $categories     = Category::orderBy('name','asc')->get();
        $collections    = Collection::orderBy('name','asc')->get();
        $orderItems     =$order->items()->with('product')->get();

        return Inertia::render('Orders/Products',[
            'products'      =>$products,
            'order'         =>$order,
            'orderItems'    =>$orderItems,
            'search'        =>$search,
            'categories'    =>$categories,
            'collections'   =>$collections,
        ]);

    }



    public function add(Order $order, Product $product)
    {

        OrderItems::create([
            'order_id' =>$order->id,
            'product_id' =>$product->id,
            //'price'=> $product->stock->getOriginal('offered_price'),
            'price'=> $product->stock->offered_price,
            'qtd'=> 1,
        ]);

        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function remove(OrderItems $orderItem)
    {

        $orderItem->delete();
        return redirect()->back()->with('message', 'Operação realizada com sucesso');

    }


    public function edit(Order $order)
    {
        $user = $order->user;

        $order = Order::where('id',$order->id)->with('payments')->with(['items'=>function($q) {
                                                $q->with(['product'=>function($q) {
                                                    $q->with('images');
                                                }]);
                                            }])->first();


        return Inertia::render('Orders/Edit',[
            'order'  => $order,
            'user'   => $user,
        ]);
    }


    public function update(OrderRequest $request, Order $order,OrderUpdateService $orderUpdateService)
    {

        $data = $request->all();
        if (isset($data['data'])){
            $str                =   $data['data'];
            $explode            =   explode("-",$str);
            $data['mes']        =   $explode[1];
            $data['ano']        =   $explode[2];
            $data['data']       =   data_reverse_traco($data['data']);
        }
        if (isset($data['previsao'])){
            $orderUpdateService->previsao($order, $data);
            $data['previsao']   =  data_reverse_traco($data['previsao']);
        }
        if ($data['entregue'] == 1) {
            $orderUpdateService->entrega($order);
        }
        $order->update($data);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function links(Order $order)
    {
        $user = $order->user;
        return Inertia::render('Orders/Links',[
            'order'         =>$order,
            'user'         =>$user,
        ]);

    }


    public function destroy(Order $order)
    {
        $order->delete();
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function  chargeback($id)
    {
        $order_datta = OrderData::find($id);
        if ($order_datta->chargeback == 0){
            $order_datta->chargeback = 1;
        }else{
            $order_datta->chargeback = 0;
        }
        $order_datta->save();
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }

}
