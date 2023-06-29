<?php

namespace App\Http\Controllers;


use App\Http\Services\SigepeService;
use App\Models\Sigepe;
use App\Models\State;
use App\Repositories\SigepeRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;


class SigepeController extends Controller
{


    private SigepeService $sigepeService;
    private SigepeRepository $sigepeRepository;

    public function __construct(SigepeService $sigepeService,SigepeRepository $sigepeRepository)
    {

        $this->sigepeService = $sigepeService;
        $this->sigepeRepository = $sigepeRepository;
    }



    public function index()
    {
        $sigepes =Sigepe::all();

        return Inertia::render('Sigepe/Index',[
            'sigepes'=>$sigepes,
        ]);

    }


    public function create()
    {

        $states =State::all();

        return Inertia::render('Sigepe/Create',[
            'states'=>$states,
        ]);

    }

    public function store(Request $request){

        $data = $request->all();
        $etiqueta_salvar = $this->sigepeService->store($data);
        $this->sigepeRepository->store($data,$etiqueta_salvar);
        return redirect()->route('sigepe.index')->with('message', 'Operação realizada com sucesso');


    }



}


