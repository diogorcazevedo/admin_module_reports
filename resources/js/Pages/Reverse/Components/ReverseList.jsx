import React from 'react';
import ReverseEdit from "@/Pages/Reverse/Components/ReverseEdit";
import moment from "moment";

export default function ReverseList({reverses}) {


    return (
        <>

           <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">

               <h3 className="text-lg mt-6">Reversos</h3>

                    <table className="shadow-sm border mt-8 min-w-full divide-y divide-x divide-gray-200">
                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                        <tr className="divide-x divide-y divide-gray-200">
                            <th  className="text-xs text-gray-900 p-4">Cliente</th>
                            <th  className="text-xs text-gray-900 p-4">Cod Reverso</th>
                            <th  className="text-xs text-gray-900 p-4">Rastreio Cliente</th>
                            <th  className="text-xs text-gray-900 p-4">Postagem Cliente</th>
                            <th  className="text-xs text-gray-900 p-4">Entrega na CB</th>
                            <th  className="text-xs text-gray-900 p-4">Rastreio CB</th>
                            <th  className="text-xs text-gray-900 p-4">Envio para o cliente</th>
                            <th  className="text-xs text-gray-900 p-4">Entrega para o cliente</th>
                            <th  className="text-xs text-gray-900 p-4">Obs</th>
                            <th  className="text-xs text-gray-900 p-4">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                    {reverses?.map((reverse) => (
                        <tr key={reverse.id} className="divide-x divide-y divide-gray-200">
                            <td className="text-xs p-4">{reverse.user.name}</td>
                            <td  className="text-xs text-gray-900 p-4"> {reverse.cod_reverso}</td>
                            <td  className="text-xs text-gray-900 p-4"> {reverse.cod_cliente_rastreio}</td>
                            <td  className="text-xs text-gray-900 p-4"> {moment(reverse.data_cliente_envio).format('DD-MM-YYYY')}</td>
                            <td  className="text-xs text-gray-900 p-4"> {moment(reverse.data_cliente_chegada).format('DD-MM-YYYY')}</td>
                            <td  className="text-xs text-gray-900 p-4"> {reverse.cod_cb_rastreio}</td>
                            <td  className="text-xs text-gray-900 p-4"> {moment(reverse.data_cb_envio).format('DD-MM-YYYY')}</td>
                            <td  className="text-xs text-gray-900 p-4"> {moment(reverse.data_cb_chegada).format('DD-MM-YYYY')}</td>
                            <td  className="text-xs text-gray-900 p-4">{reverse.obs} </td>
                            <td  className="text-xs text-gray-900 p-4">
                             <ReverseEdit reverse={reverse}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                </div>

        </>

    );
}
