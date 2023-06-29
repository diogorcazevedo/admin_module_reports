import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage} from '@inertiajs/react';
import SelectForOrderProductsByFilters from "@/Pages/Orders/Components/SelectForOrderProductsByFilters";
import OrderProductList from "@/Pages/Orders/Components/OrderProductList";
import OrderSelectedProductList from "@/Pages/Orders/Components/OrderSelectedProductList";


export default function Products({products,order,categories,collections,orderItems}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
        <>
            <Head title="Order" />
            <Auth auth={auth} errors={errors} >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <SelectForOrderProductsByFilters order={order} categories={categories} collections={collections}/>
                </div>
                <div className="flex flex-row sm:px-3 lg:px-4">
                    <div className="basis-2/3">
                        <OrderProductList products={products} order={order}/>
                    </div>
                    <div className="basis-1/3 ml-4">
                        <OrderSelectedProductList order={order} orderItems={orderItems}/>
                    </div>

                </div>
            </Auth>
        </>
    );
}
