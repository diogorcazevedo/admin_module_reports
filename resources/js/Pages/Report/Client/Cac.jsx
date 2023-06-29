import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage} from '@inertiajs/react';
import { orderBy } from "lodash";
import SidebarReports from "@/Pages/Report/Components/SidebarReports";
export default function Index({ new_clients , old_clients ,month,new_total,old_total}) {

    const {auth} = usePage().props
    const { errors } = usePage().props
    const new_users = orderBy(new_clients, ["total"], 'desc');
    const old_users = orderBy(old_clients, ["total"], 'desc');
    function getMonthName(month) {
        const date = new Date();
        date.setMonth(month - 1);
        return date.toLocaleString('en-US', { month: 'long' });
    }

    function clientsTable(data,total){
        let count = 0;
        return <table className="border mt-2 min-w-full divide-y divide-x divide-gray-200">
            <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
            <tr className="divide-x divide-y divide-gray-200">
                <th  className="text-sm text-gray-900 p-2">-</th>
                <th  width="30%"  className="text-sm text-gray-900 p-2"> CLIENTE</th>
                <th  className="text-sm text-gray-900 p-2">COMPRAS</th>
                <th  className="text-sm text-gray-900 p-2">TOTAL</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-x divide-gray-200 bg-white">
            {Object.values(data).map((item,index) => (
                <tr key={index} className="divide-x divide-y divide-gray-200">
                    <td className="text-xs p-2">{count = count + 1 }</td>
                    <td className="text-xs p-2">{item?.user}</td>
                    <td className="text-xs p-2">{item?.orders}</td>
                    <td className="text-xs p-2"> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item?.total) }</td>
                </tr>
            ))}
            </tbody>
            <tfoot>
            <tr>
                <td></td>
                <td></td>
                <td colSpan={2} width="50%" className="text-xs p-2">Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total) } </td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td colSpan={2} width="50%" className="text-xs p-2">Tiket médio: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total / count) } </td>
            </tr>
            </tfoot>
        </table>
    }


    return (
        <>
            <Head title="Sales" />
            <Auth auth={auth} errors={errors} >
                <div className="flex min-h-full flex-col">
                    <header className="shrink-0 bg-teal-800">
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <div><h1 className="text-white">{getMonthName(month)}</h1></div>
                        </div>
                    </header>
                    <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
                        <div className="flex-1 xl:flex">
                            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
                                <div className="flex flex-row">
                                    <div className="basis-1/2">
                                        <p className="bg-teal-800 py-4 px-4 text-white">Clientes Novos</p>
                                        {clientsTable(new_users,new_total)}
                                    </div>
                                    <div className="ml-4 basis-1/2">
                                        <p className="bg-teal-800 py-4 px-4 text-white">Clientes Antigos</p>
                                        {clientsTable(old_users,old_total)}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <SidebarReports />
                    </div>
                </div>
            </Auth>
        </>
    );
}

