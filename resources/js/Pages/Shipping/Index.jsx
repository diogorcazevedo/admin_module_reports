import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head,Link, usePage} from '@inertiajs/react';
import ShippingNavBar from "@/Pages/Shipping/Components/ShippingNavBar";
import CardShippingOpen from "@/Pages/Shipping/Components/CardShippingOpen";
import CardShippingClose from "@/Pages/Shipping/Components/CardShippingClose";

export default function Index({order,shippings,items,user,types}) {

    const tabs = [
        { name: 'Reverso', href: route('shipping.reverse',{order:order.id}), current: true },
        { name: 'Andamento', href: route('shipping.reverse',{order:order.id}), current: false },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    function entregue(order) {
        if (order.entregue != '1') {
            return <CardShippingOpen  order={order} user={user} items={items} types={types} shippings={shippings}/>
        }else{
            return <CardShippingClose order={order} user={user} items={items} types={types} shippings={shippings}/>
        }
    }

    const {auth} = usePage().props
    const { flash } = usePage().props
    const { errors } = usePage().props
    const status =order.entregue == 1 ? <span className='ml-4 text-emerald-900'>ENTREGUE</span> : <span className='ml-4 text-red-700'>NÃO ENTREGUE</span>;

    return (
        <>
            <Head title="Dashboard" />
            <Auth auth={auth} errors={errors} >
                <ShippingNavBar order={order} user={user} />
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4 mb-24">
                    <div className="px-4 py-5 sm:px-6 bg-gray-50 mb-4 shadow-sm ml-4 mr-4">
                        <div className="flex flex-row">
                            <div className="basis-3/4">STATUS: {status}</div>
                            <div className="basis-1/4">
                                <Link href={route('shipping.status',{order:order.id})} className="inline-block text-center w-full items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    alterar
                                </Link>
                            </div>
                        </div>
                    </div>
                    {flash.message && (
                        <div className="bg-teal-600 text-white"><p>{flash.message}</p></div>
                    )}
                    <div className="flex flex-row">
                        <div className="basis-1/2 p-6">
                            <div className="p-6 bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:p-0">
                                    <dl className="sm:divide-y sm:divide-gray-200">
                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Data da venda:</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {order.data}
                                            </dd>
                                        </div>
                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Previsto para:</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {order.previsao}
                                            </dd>
                                        </div>
                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Valor da venda</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {order.total}</dd>
                                        </div>
                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Produtos</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {items?.map((item) => (
                                                    <p key={item.id} className=" px-1 flex text-xs">
                                                        {item.product.name}
                                                    </p>
                                                ))}

                                            </dd>
                                        </div>

                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="basis-1/2 p-6">
                            <div className="mb-4 p-6 bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:p-0">
                                    <dl className="sm:divide-y sm:divide-gray-200">
                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Obs</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {order.obs}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                            {entregue(order)}
                        </div>
                    </div>
                </div>
            </Auth>
        </>

    );
}
