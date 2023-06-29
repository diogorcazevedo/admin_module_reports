
import {usePage} from '@inertiajs/react';
import React from 'react';

export default function FlashMessage({setMessage}) {

    const { flash } = usePage().props;

    function disableMessage(){
        setTimeout(() => {
            setMessage(false);
        }, 3000);
    }

    return (
        <>
            <div className="bg-teal-600 text-white p-6"><p>{flash.message}</p></div>
            {disableMessage()}
        </>
 );


}

