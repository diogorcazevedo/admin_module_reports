import moment from "moment";
import {Link} from '@inertiajs/react';

export default function ProposalsList({orders}) {

    return (
        <>
             <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                    <tr className="divide-x divide-y divide-gray-200">
                        <th  className="text-gray-900 p-2">ID</th>
                        <th  className="text-gray-900 p-2">Data</th>
                        <th  className="text-gray-900 p-2">Cliente</th>
                        <th  className="text-gray-900 p-2">Valor</th>

                        <th colSpan="3"  className="text-gray-900 p-2">
                            Ações
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                    {orders?.map((order) => (
                        <tr key={order.id} className="divide-x divide-y divide-gray-200">
                            <td className="text-sm p-2">{order?.id}</td>
                            <td className="text-sm p-2">{moment(order?.data).format('DD/MM/YYYY')}</td>
                            <td className="text-sm p-2">{order?.user.name}</td>
                            <td className="text-sm p-2">{order?.total}</td>
                            <td className="text-sm text-center items-center justify-center p-2">
                                <Link href={route("order.edit",{order:order.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    editar
                                </Link>
                            </td>
                            <td className="text-sm text-center items-center justify-center p-2">
                                <Link href={route("order.links",{order:order.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    link
                                </Link>
                            </td>
                            <td className="text-sm text-center items-center justify-center p-2">
                                <Link href={route("order.destroy",{order:order.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </>

    );
}
