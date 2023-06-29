import React from 'react'
import {Head, Link, usePage} from "@inertiajs/react";
import Auth from "@/Layouts/Auth";
import SidebarReports from "@/Pages/Report/Components/SidebarReports";
import {ChartBarIcon} from "@heroicons/react/20/solid";


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
                            <div><h1 className="text-white">Reports Center Regiões</h1></div>
                        </div>
                    </header>
                    <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
                        <div className="flex-1 xl:flex">
                            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
                                <ul role="list" className="py-4 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-2 xl:gap-x-8">
                                    <li className="overflow-hidden rounded-xl border border-gray-200">
                                        <div
                                            className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="text-sm font-medium leading-6 text-gray-900">Estados
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="text-xs font-medium leading-6 text-teal-800">(ordenado por
                                                faturamento, quantidade, mês ou ano)
                                            </div>
                                        </div>
                                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                                            <div className="flex justify-between gap-x-4 py-3">
                                                <dt className="text-gray-500">
                                                    <Link href={route("report.state.index")} className="group inline-flex text-base font-medium border border-transparent items-center px-2.5 py-1.5 text-xs font-medium rounded text-white bg-teal-800 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                                        <ChartBarIcon
                                                            className="mr-2 h-4 w-4 flex-shrink-0 text-white group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        <span className="text-white group-hover:text-gray-700 text-xs">buscar</span>
                                                    </Link>
                                                </dt>
                                            </div>
                                        </dl>
                                    </li>
                                    <li className="overflow-hidden rounded-xl border border-gray-200">
                                        <div
                                            className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="text-sm font-medium leading-6 text-gray-900">Cidades
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="text-xs font-medium leading-6 text-teal-800">(ordenado por
                                                faturamento, quantidade, mês ou ano)
                                            </div>
                                        </div>
                                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                                            <div className="flex justify-between gap-x-4 py-3">
                                                <dt className="text-gray-500">
                                                    <Link href={route("report.city.index")} className="group inline-flex text-base font-medium border border-transparent items-center px-2.5 py-1.5 text-xs font-medium rounded text-white bg-teal-800 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                                        <ChartBarIcon
                                                            className="mr-2 h-4 w-4 flex-shrink-0 text-white group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        <span className="text-white group-hover:text-gray-700 text-xs">buscar</span>
                                                    </Link>

                                                </dt>

                                            </div>
                                        </dl>
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
