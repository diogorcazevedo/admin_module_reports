import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage}  from '@inertiajs/react';
import ReverseList from "@/Pages/Reverse/Components/ReverseList";

export default function Index({reverses}) {


    const {auth} = usePage().props
    const { errors } = usePage().props
    const { flash } = usePage().props

    return (
        <>
            <Head title="reverses" />
            <Auth auth={auth} errors={errors} >
                {flash.message && (
                    <div className="bg-teal-600 text-white"><p>{flash.message}</p></div>
                )}
                <ReverseList reverses={reverses}/>
            </Auth>
        </>

    );
}
