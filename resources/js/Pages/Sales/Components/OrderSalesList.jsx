import moment from "moment";
import {Link} from '@inertiajs/react';
import React from "react";
import SalesUserSlide from "@/Pages/Users/Components/SalesUserSlide";

export default function OrderSalesList({orders,total,centro}) {

    function entrega(order) {
        if (order.entregue == 1) {
            return  <Link href={route("shipping.index",{order:order.id})} className="inline-flex  w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                        entregue
                    </Link>
        }else{
            return  <Link href={route("shipping.index",{order:order.id})} className="inline-flex  w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                        não entregue
                    </Link>
        }
    }
    return (
        <>
            <div className="mx-auto bg-teal-900 flex h-8 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div><h1 className="text-white">{centro}</h1></div>
                {/*<div className="flex items-center gap-x-8">*/}
                {/*    <div>*/}
                {/*        <h1 className="text-white">Faturamento (preço cheio) sem aplicar descontos da venda:</h1>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

            <table className="mb-20 border mt-2  w-full divide-y divide-x divide-gray-200">
                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                    <tr className="divide-x divide-y divide-gray-200">
                        {/*<th  className="text-xs font-normal text-gray-800 p-2">ID</th>*/}
                        {/*<th  width="15%" className="text-xs font-normal text-gray-800 p-2">Centro</th>*/}
                        <th  className="text-sm font-normal text-gray-800 p-2">Data</th>
                        <th  className="text-xs font-normal text-gray-800 p-2">Cliente</th>
                        <th  width="15%" className="text-xs font-normal text-gray-800 p-2 sm:inline-flex hidden">Obs</th>
                        <th  className="text-xs font-normal text-gray-800 p-2">Valor</th>
                        <th  width="25%"  className="text-xs font-normal text-gray-800 p-2">Ações</th>
                        {/*<th  className="text-xs font-normal text-gray-800 p-2">Entregue</th>*/}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                    {orders?.map((order) => (
                        <tr key={order.id} className="divide-x divide-y divide-gray-200">
                            {/*<td className="text-xs p-2">{order.id}</td>*/}
                            {/*<td className="text-xs p-2">{order.ponto?.name}</td>*/}
                            <td className="text-xs p-2">{order.data ? moment(order.data).format('DD/MM/YYYY') : ''}</td>
                            <td className="text-xs p-2"><a href={route('user.edit',{user:order.user_id})}>{order.user.name}</a></td>
                            <td className="text-xs p-2 sm:inline-flex hidden">{order.obs}</td>
                            <td className="text-xs p-2">{order.total}</td>
                            <td className="text-xs text-center items-center justify-center p-2">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
                                    <div>
                                        <Link href={route("order.edit",{order:order.id})} className="inline-flex w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                            editar
                                        </Link>
                                    </div>
                                    <div className="">
                                        <SalesUserSlide orders={order.user.orders}/>
                                    </div>
                                    <div className="">
                                        {entrega(order)}
                                    </div>
                                </div>
                            </td>
                            {/*<td className="text-sm text-center items-center justify-center p-2">*/}
                            {/*    <Link href={route("order.links",{order:order.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">*/}
                            {/*        link*/}
                            {/*    </Link>*/}
                            {/*</td>*/}
                            {/*<td className="text-xs text-center items-center justify-center p-2">*/}
                            {/*    {entrega(order)}*/}
                            {/*</td>*/}
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr className="divide-x divide-y divide-gray-200">
                        <th colSpan={7} className="bg-teal-900 text-white text-sm p-2 text-right">
                            TOTAL: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total) }
                        </th>
                    </tr>
                    </tfoot>
                </table>
        </>

    );
}
