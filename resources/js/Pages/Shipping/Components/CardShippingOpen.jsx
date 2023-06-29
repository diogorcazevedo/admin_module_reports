import React from 'react';
import ShippingSigepe from "@/Pages/Shipping/Components/ShippingSigepe";
import ShippingCreate from "@/Pages/Shipping/Components/ShippingCreate";
import {Link} from '@inertiajs/react';



export default function CardShippingOpen({order,items,user,types,shippings}) {

    function shipping_length(){
        if (shippings.length ==0){
            return   <a
                disable="disable"
                href="#"
                className="w-full block text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                Sem envio
            </a>
        }else{
            return   <Link
                href={route('shipping.get_all',{order:order.id})}
                className="w-full block text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                envios
            </Link>
        }
    }


    return (
        <>
            <div className="mb-4 p-6 bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 sm:col-span-2">Quantidade de envios:</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                                {shipping_length()}
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 sm:col-span-2">Criar sigepe</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                                <ShippingSigepe order={order} items={items} user={user} />
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 sm:col-span-2">Envio sem sigepe</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                                <ShippingCreate order={order} items={items} types={types}/>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>

    );
}
