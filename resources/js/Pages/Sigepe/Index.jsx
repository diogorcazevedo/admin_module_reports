import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage} from '@inertiajs/react';
import SigepeList from "@/Pages/Sigepe/Components/SigepeList";

export default function Index({sigepes}) {


    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
        <>
            <Head title="sigepes" />
            <Auth auth={auth} errors={errors} >
                <SigepeList sigepes={sigepes}/>
            </Auth>
        </>

    );
}
