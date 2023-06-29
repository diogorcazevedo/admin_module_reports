import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage} from '@inertiajs/react';
import SigepeList from "@/Pages/Sigepe/Components/SigepeList";
import ShippingNavBar from "@/Pages/Shipping/Components/ShippingNavBar";

export default function Sigepes({sigepes,order,user}) {


    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
        <>
            <Head title="sigepes" />
            <Auth auth={auth} errors={errors} >
              <ShippingNavBar order={order} user={user} />
              <SigepeList sigepes={sigepes}/>
            </Auth>
        </>

    );
}
