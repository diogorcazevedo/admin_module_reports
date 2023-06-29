import React from 'react';

export default function CenterResults({total_online,total_sv,total_pc,total_others,total}) {
    return (
            <>
                <div className="mt-2 py-8 sm:py-8">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:max-w-none bg-gray-50 shadow">
                            <dl className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-5">
                                <div className="flex flex-col bg-gray-50/5 p-4 shadow">
                                    <dt className="text-sm font-semibold leading-6 bg-teal-900 text-white">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total_online) }</dt>
                                    <dd className="order-first  font-semibold tracking-tight ">Online</dd>
                                </div>
                                <div className="flex flex-col bg-gray-50/5 p-4 shadow">
                                    <dt className="text-sm font-semibold leading-6 bg-teal-900 text-white">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total_sv) }</dt>
                                    <dd className="order-first  font-semibold tracking-tight ">Shopping Vitória</dd>
                                </div>
                                <div className="flex flex-col bg-gray-50/5 p-4 shadow">
                                    <dt className="text-sm font-semibold leading-6 bg-teal-900 text-white">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total_pc) }</dt>
                                    <dd className="order-first  font-semibold tracking-tight ">Praia do Canto</dd>
                                </div>
                                <div className="flex flex-col bg-gray-50/5 p-4 shadow">
                                    <dt className="text-sm font-semibold leading-6 bg-teal-900 text-white">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total_others) }</dt>
                                    <dd className="order-first  font-semibold tracking-tight ">Outros</dd>
                                </div>
                                <div className="flex flex-col bg-gray-50/5 p-4 shadow">
                                    <dt className="text-sm font-semibold leading-6 bg-teal-900 text-white">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total) }</dt>
                                    <dd className="order-first text-xl font-semibold tracking-tight ">Total</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

            </>
    );
}
