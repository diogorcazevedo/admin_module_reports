import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage} from '@inertiajs/react';
import SelectSalesForYearAndMonth from "@/Pages/Sales/Components/SelectSalesForYearAndMonth";
import OrderSalesList from "@/Pages/Sales/Components/OrderSalesList";
import CenterResults from "@/Pages/Sales/Components/CenterResults";


export default function Index({sales_others,sales_pc,sales_sv,sales_online,
                                  total_others,total_online,total_sv,total_pc,total,month,year,}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
        <>
            <Head title="Sales" />
            <Auth auth={auth} errors={errors} >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <SelectSalesForYearAndMonth get_month={month} get_year={year}/>
                    <CenterResults total_online={total_online} total_sv={total_sv}  total_pc={total_pc} total_others={total_others} total={total}/>
                    <OrderSalesList centro="Online" orders={sales_online}   total={total_online}/>
                    <OrderSalesList centro="SV"     orders={sales_sv}       total={total_sv}/>
                    <OrderSalesList centro="PC"     orders={sales_pc}       total={total_pc}/>
                    <OrderSalesList centro="OUTROS" orders={sales_others}   total={total_others}/>
                </div>
            </Auth>
        </>
    );
}
