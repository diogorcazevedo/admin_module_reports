import {Head, Link, useForm, usePage} from '@inertiajs/react';
import React from 'react';
import moment from 'moment';
import Auth from "@/Layouts/Auth";
import OrderLinks from "@/Pages/Orders/Components/OrderLinks";
import InputMask from "react-input-mask";
import PaymentsOrderData from "@/Pages/Orders/Components/PaymentsOrderData";


export default function Edit({order,user}) {

    const {auth} = usePage().props

    const { data, setData, post, processing, errors } = useForm({
        data:           order.data ? moment(order.data).format('DD-MM-YYYY'): moment().format('DD-MM-YYYY'),
        status:         order.status ? order.status:'',
        notafiscal:     order.notafiscal ? order.notafiscal:'',
        parcelamento:   order.parcelamento ? order.parcelamento:'',
        pagamento:      order.pagamento ? order.pagamento:'',
        previsao:       order.previsao ? moment(order.previsao).format('DD-MM-YYYY'): '',
        entregue:       order.entregue ? order.entregue : 0,
        canal:          order.canal ? order.canal:'',
        centro:         order.centro ? order.centro:'',
        total:          order.total ? order.total : '',
        obs:            order.obs ? order.obs : '',
    })

    function submit(e) {
        e.preventDefault()
        post(route("order.update",{order:order.id}));

    }

    function chargeback(item) {
        if (item.chargeback == 1) {
            return  <Link preserveState preserveScroll href={route("order.chargeback",{id:item.id})} className="inline-flex  w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                estornada
            </Link>
        }else{
            return  <Link preserveState preserveScroll href={route("order.chargeback",{id:item.id})} className="inline-flex  w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                sem estorno
            </Link>
        }
    }


    return (

        <>
            <Head title="Order" />
            <Auth auth={auth} errors={errors} >
                <OrderLinks order={order} user={user} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <form className="space-y-8 divide-y divide-gray-200" onSubmit={submit}>
                        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-2">
                                    <label htmlFor="total-name"
                                           className="block text-sm font-medium text-gray-700"> Valor</label>
                                    <h1>{data.total}</h1>
                                    {/*<div className="mt-1">*/}
                                    {/*    <CurrencyFormat*/}
                                    {/*        decimalScale={2}*/}
                                    {/*        fixedDecimalScale={true}*/}
                                    {/*        decimalSeparator="."*/}
                                    {/*        value={data.total}*/}
                                    {/*        onChange={e => setData('total', e.target.value)}*/}
                                    {/*        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"*/}
                                    {/*    />*/}
                                    {/*    {errors.total && <div className="text-red-600">{errors.total}</div>}*/}
                                    {/*</div>*/}
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="status"
                                           className="block text-sm font-medium text-gray-700"> Status Pagamento</label>
                                    <div className="mt-1">
                                        <select
                                            name="status"
                                            required="required"
                                            id="status"
                                            onChange={e => setData('status', e.target.value)}
                                            value={data.status}
                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option>Selecionar Status</option>
                                            <option  value="1">NÃO</option>
                                            <option  value="2">SIM</option>
                                            <option  value="999">CANCELADA</option>

                                        </select>
                                        {errors.status && <div className="text-red-600">{errors.status}</div>}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="entregue"
                                           className="block text-sm font-medium text-gray-700"> Status Entrega</label>
                                    <div className="mt-1">
                                        <select
                                            name="entregue"
                                            required="required"
                                            id="entregue"
                                            onChange={e => setData('entregue', e.target.value)}
                                            value={data.entregue}
                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option>Selecionar status entrega</option>
                                            <option  value="0">NÃO</option>
                                            <option  value="1">SIM</option>
                                        </select>
                                        {errors.status && <div className="text-red-600">{errors.status}</div>}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="Pagamento"
                                           className="block text-sm font-medium text-gray-700"> Pagamento </label>
                                    <div className="mt-1">
                                        <select
                                            name="pagamento"
                                            required="required"
                                            id="pagamento"
                                            onChange={e => setData('pagamento', e.target.value)}
                                            value={data.pagamento}
                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option>Opções de Pagamento</option>
                                            <option  value="1">Cartão de Crédito</option>
                                            <option  value="8">Débito</option>
                                            <option  value="7">Transferência</option>
                                            <option  value="9">PIX</option>
                                            <option  value="2">Dinheiro</option>
                                            <option  value="3">Cheque</option>
                                            <option  value="4">Boleto</option>
                                            <option  value="5">Caderno</option>
                                            <option  value="6">PickPay</option>
                                            <option  value="10">Outro</option>
                                        </select>
                                        {errors.pagamento && <div className="text-red-600">{errors.pagamento}</div>}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="parcelamento"
                                           className="block text-sm font-medium text-gray-700"> Parcelamento </label>
                                    <div className="mt-1">
                                        <select
                                            name="parcelamento"
                                            required="required"
                                            id="parcelamento"
                                            onChange={e => setData('parcelamento', e.target.value)}
                                            value={data.parcelamento}
                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option>Parcelas</option>
                                            <option value= '1'>1</option>
                                            <option value= '2'>2</option>
                                            <option value= '3'>3</option>
                                            <option value= '4'>4</option>
                                            <option value= '5'>5</option>
                                            <option value= '6'>6</option>
                                            <option value= '7'>7</option>
                                            <option value= '8'>8</option>
                                            <option value= '9'>9</option>
                                            <option value= '10'>10</option>
                                            <option value= '11'>11</option>
                                            <option value= '12'>12</option>
                                            <option value= '100'>A vista</option>
                                        </select>
                                        {errors.parcelamento && <div className="text-red-600">{errors.parcelamento}</div>}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="notafiscal"
                                           className="block text-sm font-medium text-gray-700"> Nota Fiscal </label>
                                    <div className="mt-1">
                                        <select
                                            name="notafiscal"
                                            required="required"
                                            id="notafiscal"
                                            onChange={e => setData('notafiscal', e.target.value)}
                                            value={data.notafiscal}
                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option>Selecionar</option>
                                            <option value="0">NÃO</option>
                                            <option value="1">SIM</option>

                                        </select>
                                        {errors.notafiscal && <div className="text-red-600">{errors.notafiscal}</div>}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="canal"
                                           className="block text-sm font-medium text-gray-700"> Ponto de Vendas </label>
                                    <div className="mt-1">
                                        <select
                                            name="centro"
                                            required="required"
                                            id="centro"
                                            onChange={e => setData('centro', e.target.value)}
                                            value={data.centro}
                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option> - </option>
                                            <option  value="1">ADM</option>
                                            <option  value="2">ONLINE</option>
                                            <option  value="3">EVENTOS</option>
                                            <option  value="4">SHOPPING VITÓRIA</option>
                                            <option  value="5">CURITIBA</option>
                                            <option  value="6">SÃO PAULO</option>
                                            <option  value="7">CAMPOS</option>
                                            <option  value="8">BH</option>
                                            <option  value="9">LOOL</option>
                                            <option  value="10">OCA - SP</option>
                                            <option  value="11">SÃO PAULO</option>
                                            <option  value="12">OUT</option>
                                            <option  value="13">PRAIA DO CANTO</option>
                                            <option  value="14">CASACOR RIO</option>
                                            <option  value="15">CARANDAÍ</option>
                                        </select>
                                        {errors.centro && <div className="text-red-600">{errors.centro}</div>}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="data"
                                           className="block text-sm font-medium text-gray-700"> Previsão do Pagamento </label>

                                    <div className="mt-1">
                                        <InputMask
                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full border-gray-300 rounded-md"
                                            mask='99-99-9999'
                                            value={data.data}
                                            onChange={e => setData('data', e.target.value)}>
                                        </InputMask>
                                        {errors.data && <div className="text-red-600">{errors.data}</div>}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="previsao" className="block text-sm font-medium text-gray-700"> Previsão entrega </label>

                                    <div className="mt-1">
                                        <InputMask
                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full border-gray-300 rounded-md"
                                            mask='99-99-9999'
                                            value={data.previsao}
                                            onChange={e => setData('previsao', e.target.value)}>
                                        </InputMask>
                                        {errors.previsao && <div className="text-red-600">{errors.previsao}</div>}
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label htmlFor="obs" className="block text-sm font-medium text-gray-700"> Obs: </label>
                                    <div className="mt-1">
                                        <textarea
                                            rows="5"
                                            value={data.obs}
                                            onChange={e => setData('obs', e.target.value)}
                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md">
                                            {data.obs}
                                        </textarea>
                                            {errors.obs && <div className="text-red-600">{errors.obs}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-5">
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                    disabled={processing}>
                                    SALVAR
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="py-8">
                        <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                            <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                            <tr className="divide-x divide-y divide-gray-200">
                                <th  className="text-gray-900 font-medium p-2 py-6">Img</th>
                                <th  className="text-gray-900 font-medium p-2 py-6">Name</th>
                                <th  className="text-gray-900 font-medium p-2 py-6">Valor</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-x divide-gray-200 bg-white">
                            {order.items.map((item) => (
                                <tr key={item.id} className="divide-x divide-y divide-gray-200">
                                    <td width="30%" className="text-sm p-2">
                                        <Link href={route('product.images.index',{product:item.product.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                            <img className="w-24 h-24  flex-shrink-0"
                                                 src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/"+item.product.images[0]?.path}/>
                                        </Link>

                                    </td>
                                    <td className="text-sm p-2">
                                        <Link href={route('product.edit',{product:item.product.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                            {item.product.name}
                                        </Link>
                                    </td>
                                    <td className="text-sm p-2">
                                        { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {order.payments &&
                        <div className="py-8">
                            <PaymentsOrderData order={order} />
                        </div>
                    }
                </div>
            </Auth>
        </>
    )
}
