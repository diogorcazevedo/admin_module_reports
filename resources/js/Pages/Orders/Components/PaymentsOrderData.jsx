import React from "react";

export default function PaymentsOrderData({order}) {

    return (
        <>
            <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                <tr className="divide-x divide-y divide-gray-200">
                    <th  className="text-gray-900 font-medium p-2 py-6">Bandeira</th>
                    <th  className="text-gray-900 font-medium p-2 py-6">Name</th>
                    <th  className="text-gray-900 font-medium p-2 py-6">Number</th>
                    <th  className="text-gray-900 font-medium p-2 py-6">Parcelas</th>
                    <th  className="text-gray-900 font-medium p-2 py-6">Status</th>
                    <th  className="text-gray-900 font-medium p-2 py-6">Total</th>
                    <th  className="text-gray-900 font-medium p-2 py-6">Obs</th>
                    <th  className="text-gray-900 font-medium p-2 py-6">Data</th>
                    <th  className="text-gray-900 font-medium p-2 py-6">Estornada</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-x divide-gray-200 bg-white">
                {order.payments.map((item) => (
                    <tr key={item.id} className="divide-x divide-y divide-gray-200">
                        <td className="text-sm p-2">{item.bandeira}</td>
                        <td className="text-sm p-2">{item.name}</td>
                        <td className="text-sm p-2">****.****.****.{item.number.slice(-4)}</td>
                        <td className="text-sm p-2">{item.parcelas}</td>
                        <td className="text-sm p-2">{item.status}</td>
                        <td className="text-sm p-2">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total) }</td>
                        <td className="text-sm p-2">{item.error_message}</td>
                        <td className="text-sm p-2">{item.created_at}</td>
                        <td className="text-sm p-2">{chargeback(item)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>

    );
}
