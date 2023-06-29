import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage} from '@inertiajs/react';
import ShippingNavBar from "@/Pages/Shipping/Components/ShippingNavBar";
import ReverseList from "@/Pages/Reverse/Components/ReverseList";

export default function Reverse({order,reverses,items,user}) {



    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
        <>
            <Head title="Reverse" />
            <Auth auth={auth} errors={errors} >
                <ShippingNavBar order={order} user={user} />
                <div className="max-w-7xl mt-12 mx-auto sm:px-6 lg:px-4">
                    <ReverseList reverses={reverses}/>
                </div>
            </Auth>
        </>

    );
}
