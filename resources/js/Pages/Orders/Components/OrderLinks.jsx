import React from 'react';


export default function OrderLinks({order,user}) {

    const link_rede = "https://www.carlabuaiz.co/order/checkout/" + order.id
    // const link_rede = "https://www.carlabuaiz.co/jewelry/checkout/" + order.id + "/1"
    // const link_pagar_me = "https://www.carlabuaiz.co/jewelry/checkout/" + order.id + "/2"
    // const link_pagar_me = "https://www.carlabuaiz.co/payment/pagar_me/checkout/" + order.id

    function show(order){

        if (order.status != 2 && order.total > 1 ){
            return true;
        }else{
            return false;
        }
    }
    return (
        <>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="shadow mt-6 p-4 flex flex-row">
                    <div className="basis-1/4 bg-gray-50">
                        <h4 className="text-gray-700 sm:text-xl sm:truncate">
                            ID: {order.id}
                        </h4>
                    </div>
                    <div className="basis-2/4 bg-gray-50">
                        <h4 className="text-gray-700 sm:text-xl sm:truncate">Cliente: {user.name}</h4>
                    </div>
                    <div className="basis-1/4 bg-gray-50">
                        <h4 className="text-gray-700 sm:text-xl sm:truncate">
                        Total Compra: R$: {order.total}
                        </h4>
                    </div>
                    <div className="basis-1/4 bg-gray-50">
                        <div className="flex justify-end">
                            <a href={route('print.shipping.address',{order:order.id})}
                               className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                endereço
                            </a>
                        </div>
                    </div>

                </div>
                {show(order) && (
                <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                    <tr className="divide-x divide-y divide-gray-200">
                        <th  className="text-gray-900 p-2">OPERADORA</th>
                        <th  className="text-gray-900 p-2">id</th>
                        <th  className="text-gray-900 p-2">url</th>
                        <th  className="text-gray-900 p-2">link</th>

                    </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">

                    <tr className="divide-x divide-y divide-gray-200">
                        <td className="text-sm p-2">Rede</td>
                        <td className="text-sm p-2">{order.id}</td>
                        <td className="text-sm p-2">https://www.carlabuaiz.co/order/checkout/{order.id}</td>
                        <td className="text-sm p-2">
                            <a href={link_rede}
                               target="_blank"
                               className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                abrir
                            </a>
                        </td>
                    </tr>

                    {/*<tr className="divide-x divide-y divide-gray-200">*/}
                    {/*    <td className="text-sm p-2">Pagar.me</td>*/}
                    {/*    <td className="text-sm p-2">{order.id}</td>*/}
                    {/*    <td className="text-sm p-2">https://www.carlabuaiz.co/jewelry/checkout/{order.id}/2</td>*/}
                    {/*    <td className="text-sm p-2">*/}
                    {/*        <a href={link_pagar_me}*/}
                    {/*           target="_blank"*/}
                    {/*           className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">*/}
                    {/*            abrir*/}
                    {/*        </a>*/}
                    {/*    </td>*/}
                    {/*</tr>*/}

                    </tbody>
                </table>
                )}
            </div>

        </>
    );
}
