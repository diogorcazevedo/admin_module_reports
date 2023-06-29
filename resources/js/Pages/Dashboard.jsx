import React from 'react';
import { Head,Link, usePage } from '@inertiajs/react';
import FormSearchGeneric from "@/Components/Application/FormSearchGeneric";
import Auth from "@/Layouts/Auth";


export default function Dashboard({total}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
        <>
            <Head title="Dashboard" />

            <Auth auth={auth} errors={errors} >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
                        <div  className="px-4 py-5 sm:p-6">
                            <dt className="text-base font-normal text-gray-900">PRODUTOS</dt>
                            <dd className="mt-1 w-full flex justify-between items-baseline md:block lg:flex">
                                <div className="flex w-full items-baseline text-2xl font-semibold text-teal-600">
                                    <FormSearchGeneric rte="product.index" label="produtos"/>
                                </div>
                            </dd>
                        </div>
                        <div  className="px-4 py-5 sm:p-6">
                            <dt className="text-base font-normal text-gray-900">CLIENTES</dt>
                            <dd className="mt-1 w-full flex justify-between items-baseline md:block lg:flex">
                                <div className="flex w-full items-baseline text-2xl font-semibold text-teal-600">
                                    <FormSearchGeneric rte="user.index" label="clientes"/>
                                </div>
                            </dd>
                        </div>
                        <div  className="px-4 py-5 sm:p-6">
                            <dt className="text-base text-xl font-semibold text-teal-600">
                                { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total) }
                            </dt>
                            <dd className="mt-2 flex justify-end items-baseline md:block lg:flex">
                                <div className="flex items-baseline text-2xl font-semibold text-teal-600">
                                <span className="ml-6 text-sm font-medium text-gray-500">
                                     <Link href={route('order.client')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-emerald-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                        Lançar Nova Venda
                                     </Link>
                                </span>
                                </div>
                            </dd>
                        </div>
                    </dl>
                </div>
            </Auth>

        </>

    );
}
