import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage} from '@inertiajs/react';
import ShippingOpenList from "@/Pages/Shipping/Components/ShippingOpenList";

export default function Open({orders,shipping_others,shipping_pc,shipping_sv,shipping_online}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
        <>
            <Head title="Shipping" />
            <Auth auth={auth} errors={errors} >
             <ShippingOpenList center={"Praia do Canto"} orders={shipping_pc} />
             <ShippingOpenList center={"Online"} orders={shipping_online} />
             <ShippingOpenList center={"Shopping Vitória"} orders={shipping_sv} />
             <ShippingOpenList center={"Outros"} orders={shipping_others} />
            </Auth>
        </>

    );
}
