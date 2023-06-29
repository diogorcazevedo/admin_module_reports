import {Link} from '@inertiajs/react';
import React from "react";

export default function OrderSelectedProductList({order,orderItems}) {

    return (
        <>
            <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                <tr className="divide-x divide-y divide-gray-200">

                    <th  className="text-gray-900 p-2">Name</th>
                    <th  className="text-gray-900 p-2">
                        Ações
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-x divide-gray-200 bg-white">
                {orderItems.map((orderItem) => (
                    <tr key={orderItem.id} className="divide-x divide-y divide-gray-200">
                        <td className="text-sm p-2">{orderItem.product.name}</td>
                        <td className="text-sm text-center items-center justify-center p-2">
                            <Link href={route('order.remove',{orderItem:orderItem.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                remover
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Link
                href={route('order.edit',{order:order.id})}
                className="w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
                finalizar
            </Link>
        </>

    );
}
