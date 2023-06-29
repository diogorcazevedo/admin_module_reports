import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage} from '@inertiajs/react';
import moment from "moment";
import ShippingCreate from "@/Pages/Shipping/Components/ShippingCreate";
import ShippingEdit from "@/Pages/Shipping/Components/ShippingEdit";
import ShippingNavBar from "@/Pages/Shipping/Components/ShippingNavBar";
import ShippingItems from "@/Pages/Shipping/Components/ShippingItems";

export default function All({order,shippings,items,user,types}) {


    const {auth} = usePage().props
    const {flash} = usePage().props
    const { errors } = usePage().props
    const status =order.entregue == 1 ? "ENTREGUE" : "NÃO ENTREGUE";

    return (
        <>
            <Head title="Dashboard" />
            <Auth auth={auth} errors={errors} >
                {flash.message && (
                    <div className="bg-teal-600 text-white"><p>{flash.message}</p></div>
                )}
                <ShippingNavBar order={order} user={user} />
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
                    <table className="shadow-sm border mt-8 min-w-full divide-y divide-x divide-gray-200">
                        <thead className="bg-white divide-y divide-x divide-gray-200">
                        <tr>
                            <td colSpan="3" className="text-left ml-4 pl-4">Envio </td>
                            <td>
                                <ShippingCreate order={order} items={items} types={types}/>
                            </td>
                        </tr>
                        </thead>
                    </table>
                    <table className="shadow-sm border mt-8 min-w-full divide-y divide-x divide-gray-200">
                    <thead className="bg-white divide-y divide-x divide-gray-200">
                        <tr className="divide-x divide-y divide-gray-200">
                            <td className="text-sm text-left ml-4 pl-4">venda </td>
                            <td className="text-sm text-center">envio </td>
                            <td className="text-sm text-center">rastreio </td>
                            <td className="text-sm text-center">itens</td>
                            <td className="text-sm text-center" colSpan={3}>ações</td>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                    {shippings?.map((shipping) => (
                        <tr key={shipping.id} className="divide-x divide-y divide-gray-200">
                            <td className="text-sm p-2">{shipping.order_id}</td>
                            <td className="text-sm p-2">{moment(shipping.data_envio).format('DD/MM/YYYY')}</td>
                            <td className="text-sm p-2">{shipping.cod_rastreio}</td>
                            <td className="text-sm text-center items-center justify-center p-2">
                                {shipping.shipping_items?.map((item) => (
                                    <p key={item.id} className="text-sm">{item.product.name}</p>
                                ))}
                            </td>
                            <td  className="text-gray-900 p-2">
                                <ShippingEdit order={order} items={items} shipping={shipping} types={types} />
                            </td>
                            <td  className="text-gray-900 p-2">
                                <ShippingItems order={order} items={items} shipping={shipping}  />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                </div>
            </Auth>
        </>

    );
}
