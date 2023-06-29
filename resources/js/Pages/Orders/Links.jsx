import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage} from '@inertiajs/react';
import OrderLinks from "@/Pages/Orders/Components/OrderLinks";

export default function Links({order,user}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
        <>
            <Head title="Order" />
            <Auth auth={auth} errors={errors} >

              <OrderLinks order={order} user={user} />

            </Auth>
        </>
    );
}
