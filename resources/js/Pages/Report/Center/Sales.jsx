import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage} from '@inertiajs/react';
import SidebarReports from "@/Pages/Report/Components/SidebarReports";
import _ from "lodash";

export default function Sales({data,month,sales_total}) {

    const {auth} = usePage().props
    const { errors } = usePage().props
    let count = 0
    function getMonthName(month) {
        const date = new Date();
        date.setMonth(month - 1);
        return date.toLocaleString('en-US', { month: 'long' });
    }


    return (
        <>
            <Head title="Sales" />
            <Auth auth={auth} errors={errors} >
                <div className="flex min-h-full flex-col">
                    <header className="shrink-0 bg-teal-800">
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <div><h1 className="text-white">{getMonthName(month)}</h1></div>
                            <div className="flex items-center gap-x-8">
                                <div><h1 className="text-white">Faturamento: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sales_total) }</h1></div>
                            </div>
                        </div>
                    </header>
                    <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
                        <div className="flex-1 xl:flex">
                            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
                                <table className="border mt-2 min-w-full divide-y divide-x divide-gray-200">
                                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                                    <tr className="divide-x divide-y divide-gray-200">
                                        <th  className="text-gray-900 p-2">Count</th>
                                        <th  width="50%" className="text-gray-900 p-2">Centro</th>
                                        <th  width="10%" className="text-gray-900 p-2">Lançamentos</th>
                                        <th  className="text-gray-900 p-2">Total</th>

                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-x divide-gray-200 bg-white">

                                        {Object.values(data).map((item, key) => {
                                            let sum = _.sumBy(item, dt => Number(dt.total));

                                            return <tr key={count} className="divide-x divide-y divide-gray-200">
                                                <td className="text-xs p-2">{count = count + 1}</td>
                                                <td className="text-xs p-2">{item[0].ponto?.name}</td>
                                                <td className="text-xs p-2">{item.length}</td>
                                                <td className="text-xs p-2"> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sum) }</td>
                                            </tr>
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={4}  className="text-xs p-2 text-right">Faturamento: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sales_total) }</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <SidebarReports />
                    </div>
                </div>
            </Auth>
        </>
    );
}
