import {Link} from '@inertiajs/react';
import React from "react";
import moment from "moment/moment";

export default function ShippingOpenList({center,orders}) {


    return (
        <>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
                      <span className="inline-flex items-center px-1 pt-8 mr-4 leading-5">
                        <span className="font-semibold text-xl text-teal-600 leading-tight">Pendências entrega: {center} </span>
                    </span>

                <table className="shadow-sm border mt-8 min-w-full divide-y divide-x divide-gray-200">
                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                    <tr className="divide-x divide-y divide-gray-200">
                        {/*<th  className="text-xs text-gray-900 p-2">ID </th>*/}
                        <th  className="text-xs text-gray-900 p-2">Vendedor </th>
                        <th  className="text-xs text-gray-900 p-2">Cliente </th>
                        <th  className="text-xs text-gray-900 p-2">Status </th>
                        <th  className="text-xs text-gray-900 p-2">Venda </th>
                        <th  className="text-xs text-gray-900 p-2">Previsão </th>
                        <th  className="text-xs text-gray-900 p-2">Itens </th>
                        <th  className="text-xs text-gray-900 p-2">Ação </th>

                    </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                    {orders?.map((order) => (
                        <tr key={order.id} className="divide-x divide-y divide-gray-200">
                            {/*<td className="text-xs p-2">*/}
                            {/*    <Link href={route("order.edit",{order:order.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">*/}
                            {/*        {order.id}*/}
                            {/*    </Link>*/}
                            {/*</td>*/}
                            <td width="25%" className="text-xs p-2">
                                <Link href={route('user.edit',{user:order.user_id})}>
                                    {order.seller.name}
                                </Link>
                            </td>
                            <td width="25%" className="text-xs p-2">
                                <Link href={route('user.edit',{user:order.user_id})}>
                                    {order.user.name}
                                </Link>
                            </td>
                            <td width="10%" className="text-xs p-2"> {order.entregue == 1 ? "entregue" : "não entregue"}</td>
                            <td className="text-xs p-2"> {moment(order.data).format('DD/MM/YYYY')}</td>
                            <td className="text-xs p-2"> {moment(order.previsao).format('DD/MM/YYYY')}</td>
                            <td width="25%" className="text-xs text-center items-center justify-center p-2">
                                {order.items?.map((item) => (
                                    <p key={item.id} className="mb-4">
                                        <span className="lowercase inline-flex items-center px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-800">
                                            {item.product.name}
                                          </span>
                                    </p>
                                ))}
                            </td>
                            <td  className="text-gray-900 p-2">
                                <Link href={route("order.edit",{order:order.id})}  className="w-full my-2 px-4 py-2 border border-transparent text-xs font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    Editar
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>

    );
}
