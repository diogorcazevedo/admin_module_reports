import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage} from '@inertiajs/react';
import SelectProposalsForYearAndMonth from "@/Pages/Proposal/Components/SelectProposalsForYearAndMonth";
import ProposalsList from "@/Pages/Proposal/Components/ProposalsList";


export default function Index({orders,total,month,year}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
        <>
            <Head title="Proposals" />
            <Auth auth={auth} errors={errors} >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <SelectProposalsForYearAndMonth get_month={month} get_year={year} total={total}/>
                    <ProposalsList orders={orders}/>
                </div>
            </Auth>
        </>
    );
}
