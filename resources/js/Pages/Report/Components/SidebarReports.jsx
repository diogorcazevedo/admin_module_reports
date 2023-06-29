import React from 'react';
import {Link} from "@inertiajs/react";

export default function SidebarReports({}) {

    return (
        <>
            <div className="py-8 shrink-0  lg:w-56 ">
                <div className="mb-4">
                    <Link  href={route('report.center.index')} className="mb-1 w-full inline-flex bg-teal-700 hover:bg-teal-600 shadow-lg py-4-sm font-medium px-2 py-2 text-sm  py-4-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Pontos de Venda
                    </Link>
                    <ul role="list" className="divide-y divide-gray-100">
                        <Link preserveScroll href={route('report.center.month_sales')}>
                            <li  className="shadow py-2 hover:bg-teal-600 hover:text-white mb-1">
                                <span  className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    faturamento (mês atual)
                                </span>
                            </li>
                        </Link>

                        <Link preserveScroll href={route('report.center.month_quantity')}>
                            <li  className="shadow py-2 hover:bg-teal-600 hover:text-white">
                                <span preserveScroll className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    quantidade (mês atual)
                                </span>
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className="mb-4">
                    <Link  href={route('report.product.index')} className="mb-1 w-full inline-flex bg-teal-700 hover:bg-teal-600 shadow-lg py-4-sm font-medium px-2 py-2 text-sm  py-4-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Products
                    </Link>
                    <ul role="list" className="divide-y divide-gray-100">
                        <Link preserveScroll  href={route('report.product.month_sales')}>
                            <li  className="shadow py-2 hover:bg-teal-600 hover:text-white mb-1">
                                <span  className="px-4 text-sm hover:bg-teal-600 hover:text-white">
                                    faturamento (mês atual)
                                </span>
                            </li>
                        </Link>
                        <Link preserveScroll  href={route('report.product.month_quantity')}>
                            <li  className="shadow py-2 hover:bg-teal-600 hover:text-white">
                                <span  className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    quantidade (mês atual)
                                </span>
                            </li>
                        </Link>

                    </ul>
                </div>
                <div className="mb-4">
                    <Link  href={route('report.collection.index')} className="mb-1 w-full inline-flex bg-teal-700 hover:bg-teal-600 shadow-lg py-4-sm font-medium px-2 py-2 text-sm  py-4-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Coleções
                    </Link>
                    <ul role="list" className="divide-y divide-gray-100">
                        <Link preserveScroll  href={route('report.collection.month_sales')}>
                            <li className="shadow py-2 hover:bg-teal-600 hover:text-white mb-1 ">
                                <span className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    faturamento (mês atual)
                                </span>
                            </li>
                        </Link>
                        <Link preserveScroll  href={route('report.collection.month_quantity')}>
                            <li className="shadow py-2 hover:bg-teal-600 hover:text-white">
                                <span  className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    quantidade (mês atual)
                                </span>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="mb-4">
                    <Link  href={route('report.category.index')} className="mb-1 w-full inline-flex bg-teal-700 hover:bg-teal-600 shadow-lg py-4-sm font-medium px-2 py-2 text-sm  py-4-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Categorias
                    </Link>
                    <ul role="list" className="divide-y divide-gray-100">
                        <Link preserveScroll  href={route('report.category.month_sales')}>
                            <li className="shadow py-2 hover:bg-teal-600 hover:text-white mb-1 ">
                                <span  className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    faturamento (mês atual)
                                </span>
                            </li>
                        </Link>
                        <Link preserveScroll href={route('report.category.month_quantity')}>
                            <li className="shadow py-2 hover:bg-teal-600 hover:text-white">
                                <span className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    quantidade (mês atual)
                                </span>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="mb-4">
                    <Link  href={route('report.client.index')} className="mb-1 w-full inline-flex  bg-teal-700 hover:bg-teal-600 shadow-lg py-4-sm font-medium  px-2 py-2 text-sm  py-4-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Clientes
                    </Link>
                    <ul role="list" className="divide-y divide-gray-100 ">
                        <Link preserveScroll href={route('report.client.month_sales')}>
                            <li className="shadow py-2 hover:bg-teal-600 hover:text-white mb-1">
                                <span className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    faturamento (mês atual)
                                </span>
                            </li>
                        </Link>
                        <Link preserveScroll href={route('report.client.month_quantity')}>
                            <li  className="shadow py-2 hover:bg-teal-600 hover:text-white mb-1">
                                <span className="px-4 text-sm hover:bg-teal-600 hover:text-white">
                                    quantidade (mês atual)
                                </span>
                            </li>
                        </Link>
                        <Link preserveScroll href={route('report.client.month_cac')}>
                            <li  className="shadow py-2 hover:bg-teal-600 hover:text-white mb-1">
                                <span className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    cac (mês atual)
                                </span>
                            </li>
                        </Link>
                        <Link preserveScroll href={route("report.client.year_gender",{gender:"F" , year:"2023"})}>
                            <li  className="shadow py-2 hover:bg-teal-600 hover:text-white mb-1">
                                <Link className="px-4 text-sm hover:bg-teal-600 hover:text-white">
                                    mulheres (ano atual)
                                </Link>
                            </li>
                        </Link>
                        <Link preserveScroll href={route("report.client.year_gender",{gender:"M" , year:"2023"})}>
                            <li  className="shadow py-2 hover:bg-teal-600 hover:text-white">
                                <span className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    homens (ano atual)
                                </span>
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className="mb-4">
                    <Link  href={route('report.state.index')} className="mb-1 w-full inline-flex bg-teal-700 hover:bg-teal-600 shadow-lg py-4-sm font-medium  px-2 py-2 text-sm  py-4-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Estado
                    </Link>
                    <ul role="list" className="divide-y divide-gray-100 ">
                        <Link href={route('report.state.month_sales')}>
                            <li  className="shadow py-2 hover:bg-teal-600 hover:text-white mb-1">
                                <span  className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    faturamento (mês atual)
                                </span>
                            </li>
                        </Link>
                        <Link href={route('report.state.month_quantity')}>
                            <li  className="shadow py-2 hover:bg-teal-600 hover:text-white">
                                <span  className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    quantidade (mês atual)
                                </span>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="mb-4">
                    <Link  href={route('report.city.index')} className="mb-1 w-full inline-flex bg-teal-700 hover:bg-teal-600 shadow-lg py-4-sm font-medium  px-2 py-2 text-sm  py-4-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Cidades
                    </Link>
                    <ul role="list" className="divide-y divide-gray-100 ">
                        <Link href={route('report.city.month_sales')}>
                            <li  className="shadow py-2 hover:bg-teal-600 hover:text-white mb-1">
                                <span className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    faturamento (mês atual)
                                </span>
                            </li>
                        </Link>
                        <Link href={route('report.city.month_quantity')}>
                            <li  className="shadow py-2 hover:bg-teal-600 hover:text-white">
                                <span  className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    quantidade (mês atual)
                                </span>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="mb-4">
                    <Link  href={route('report.seller.index')} className="mb-1 w-full inline-flex bg-teal-700 hover:bg-teal-600 shadow-lg py-4-sm font-medium  px-2 py-2 text-sm  py-4-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Vendedores
                    </Link>
                    <ul role="list" className="divide-y divide-gray-100 ">
                        <Link href={route('report.seller.month_sales')}>
                            <li  className="shadow py-2 hover:bg-teal-600 hover:text-white mb-1">
                                <span  className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    faturamento (mês atual)
                                </span>
                            </li>
                        </Link>
                        <Link href={route('report.seller.month_quantity')}>
                            <li  className="shadow py-2 hover:bg-teal-600 hover:text-white">
                                <span  className="px-4 text-sm hover:bg-teal-600 hover:text-white" >
                                    quantidade (mês atual)
                                </span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    );
}
