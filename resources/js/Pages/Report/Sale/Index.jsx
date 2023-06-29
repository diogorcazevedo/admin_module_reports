import React from 'react'
import {Head, Link, usePage} from "@inertiajs/react";
import Auth from "@/Layouts/Auth";
import SidebarReports from "@/Pages/Report/Components/SidebarReports";


const statuses = {
    Paid: 'text-green-700 bg-green-50 ring-green-600/20',
    Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Index() {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
        <>
            <Head title="Reports" />
            <Auth auth={auth} errors={errors} >
                <div className="flex min-h-full flex-col">
                    <header className="shrink-0 bg-teal-800">
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <div><h1 className="text-white">Reports Center Vendas</h1></div>
                        </div>
                    </header>
                    <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
                        <div className="flex-1 xl:flex">
                            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
                                <ul role="list" className="py-4 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-2 xl:gap-x-8">
                                    <li className="overflow-hidden rounded border border-gray-200">
                                        <Link href={route('report.product.index')} >
                                            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                                <div className="col-span-3 text-sm font-medium leading-6 text-gray-900">Vendas Produtos
                                                    <br/>
                                                    <span className="text-xs font-medium leading-6 text-teal-800">(ordenado por faturamento, quantidade, mês ou ano)</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="overflow-hidden rounded border border-gray-200">
                                        <Link href={route('report.client.index')} >
                                        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="col-span-3 text-sm font-medium leading-6 text-gray-900">Vendas Clientes
                                                <br/>
                                                <span className="text-xs font-medium leading-6 text-teal-800">(ordenado por faturamento, quantidade, mês ou ano)</span>
                                            </div>
                                        </div>
                                        </Link>
                                    </li>
                                    <li className="overflow-hidden rounded border border-gray-200">
                                        <Link href={route('report.client.index')} >
                                            <div className="grid grid-cols-4 items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                                <div className="col-span-3 text-sm font-medium leading-6 text-gray-900">Vendas Coleções
                                                    <br/>
                                                    <span className="text-xs font-medium leading-6 text-teal-800">(ordenado por faturamento, quantidade, mês ou ano)</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="overflow-hidden rounded border border-gray-200">
                                        <Link href={route('report.category.index')} >
                                            <div className="grid grid-cols-4 items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                                <div className="col-span-3 text-sm font-medium leading-6 text-gray-900">Vendas Categorias
                                                    <br/>
                                                    <span className="text-xs font-medium leading-6 text-teal-800">(ordenado por faturamento, quantidade, mês ou ano)</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="overflow-hidden rounded border border-gray-200">
                                        <Link href={route('report.position.index')} >
                                            <div className="grid grid-cols-4 items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                                <div className="col-span-3 text-sm font-medium leading-6 text-gray-900">Vendas Região
                                                    <br/>
                                                    <span className="text-xs font-medium leading-6 text-teal-800">(ordenado por faturamento, quantidade, mês ou ano)</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="overflow-hidden rounded border border-gray-200">
                                        <Link href={route('report.client.index')} >
                                        <div className="grid grid-cols-4 items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="col-span-3 text-sm font-medium leading-6 text-gray-900">Vendas de Vendedor
                                                <br/>
                                                <span className="text-xs font-medium leading-6 text-teal-800">(ordenado por faturamento, quantidade, mês ou ano)</span>
                                            </div>
                                        </div>
                                        </Link>
                                    </li>
                                    <li className="overflow-hidden rounded border border-gray-200">
                                        <Link href={route('report.center.index')} >
                                            <div className="grid grid-cols-4 items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                                <div className="col-span-3 text-sm font-medium leading-6 text-gray-900">Vendas de Ponto de Venda
                                                    <br/>
                                                    <span className="text-xs font-medium leading-6 text-teal-800">(ordenado por faturamento, quantidade, mês ou ano)</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>

                                    <li className="overflow-hidden rounded border border-gray-200">
                                        <Link href={route('report.client.index')} >
                                        <div className="grid grid-cols-4 items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="col-span-3 text-sm font-medium leading-6 text-gray-900">Faixa de preço
                                                <br/>
                                                <span className="text-xs font-medium leading-6 text-teal-800">(ordenado por faturamento, quantidade, mês ou ano)</span>
                                            </div>
                                        </div>
                                        </Link>
                                    </li>
                                    <li className="overflow-hidden rounded border border-gray-200">
                                        <Link href={route('report.client.index')} >
                                            <div className="grid grid-cols-4 items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                                <div className="col-span-3 text-sm font-medium leading-6 text-gray-900">Gênero (homem-mulher)
                                                    <br/>
                                                    <span className="text-xs font-medium leading-6 text-teal-800">(ordenado por faturamento, quantidade, mês ou ano)</span>
                                                </div>
                                            </div>
                                        </Link>

                                    </li>
                                </ul>
                            </div>
                        </div>
                        <SidebarReports />
                    </div>
                </div>
            </Auth>
        </>
    )
}
