import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
// import CurrencyFormat from "react-currency-format";
import {useForm} from '@inertiajs/react';


export default function ReverseEdit({order, user, items}) {
    const [open, setOpen] = useState(false)

    const { data, setData, post, processing, errors } = useForm({

        cod_reverso: '',
        cod_cliente_rastreio: '',
        data_cliente_envio:  '',
        data_cliente_chegada: '',
        data_cb_envio: '',
        data_cb_chegada: '',
        cod_cb_rastreio: '',
        obs: '',
        user_id:  user.id,
        order_id: order.id,
        products: [],
    })

    function submit(e) {
        e.preventDefault()
        post(route('shipping.reverse.logistic.store',{order:order.id}));
        setOpen(false)
    }

    const handleChecked = (e) => {
        let id = e.target.value;
        if (e.target.checked) {
            setData("products", [...data.products, id]);
        } else {
            setData(
                "products",
                data.products.filter((item) => {
                    return item !== id;
                })
            );
        }
    };


    return (
        <>

            <button
                type="button"
                className="w-full my-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => setOpen(true)}
            >
                criar
            </button>
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative  z-50" onClose={setOpen}>
                <div className="fixed inset-0" />
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                    <form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl" onSubmit={submit}>
                                        <div className="flex-1">
                                            {/* Header */}
                                            <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between space-x-3">
                                                    <div className="space-y-1">
                                                        <Dialog.Title className="text-lg font-medium text-gray-900"> Editar Envio </Dialog.Title>
                                                    </div>
                                                    <div className="flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="text-gray-400 hover:text-gray-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Divider container */}
                                            <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                                                {/* Privacy */}
                                                <fieldset className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <legend className="sr-only">Privacy</legend>
                                                    <div className="text-sm font-medium text-gray-900" aria-hidden="true">
                                                        Privacy
                                                    </div>
                                                    <div className="space-y-5 sm:col-span-2">
                                                        <div className="space-y-5 sm:mt-0">
                                                            {items?.map((item,index) => (
                                                                <div key={index} className="relative flex items-start">
                                                                    <div className="absolute flex h-5 items-center">
                                                                        <input
                                                                            aria-describedby="public-access-description"
                                                                            type="checkbox"
                                                                            className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-500"
                                                                            name="products[]"
                                                                            id={`product${item.product.id}`}
                                                                            value={item.product.id}
                                                                            onChange={handleChecked}

                                                                        />
                                                                    </div>
                                                                    <div className="pl-7 text-sm">
                                                                        <label htmlFor="public-access" className="font-medium text-gray-900">
                                                                            {item.product.name}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                {/* Project name */}
                                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="cod_reverso"
                                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                        >
                                                            Código de Reverso
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            id="cod_reverso"
                                                            value={data.cod_reverso}
                                                            onChange={e => setData('cod_reverso', e.target.value)}
                                                            name="cod_reverso"
                                                            autoComplete="cod_reverso"
                                                            className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                        />
                                                        {errors.cod_reverso && <div className="text-red-600">{errors.cod_reverso}</div>}
                                                    </div>
                                                </div>
                                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="data_cliente_envio"
                                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                        >
                                                            Data Envio Cliente
                                                        </label>
                                                    </div>
                                                    <h2>{data.data_cliente_envio}</h2>
                                                    {/*<div className="sm:col-span-2">*/}
                                                    {/*    <CurrencyFormat*/}
                                                    {/*        format="##-##-####"*/}
                                                    {/*        value={data.data_cliente_envio}*/}
                                                    {/*        onChange={e => setData('data_cliente_envio', e.target.value)}*/}
                                                    {/*        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"*/}
                                                    {/*    />*/}
                                                    {/*    {errors.data_cliente_envio && <div className="text-red-600">{errors.data_cliente_envio}</div>}*/}
                                                    {/*</div>*/}
                                                </div>
                                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="cod_cliente_rastreio"
                                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                        >
                                                            Código de Rastreio Cliente
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            id="cod_cliente_rastreio"
                                                            value={data.cod_cliente_rastreio}
                                                            onChange={e => setData('cod_cliente_rastreio', e.target.value)}
                                                            name="cod_cliente_rastreio"
                                                            autoComplete="cod_cliente_rastreio"
                                                            className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                        />
                                                        {errors.cod_cliente_rastreio && <div className="text-red-600">{errors.cod_cliente_rastreio}</div>}
                                                    </div>
                                                </div>

                                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="data_cliente_chegada"
                                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                        >
                                                            Data da Chegada na CB
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <CurrencyFormat
                                                            format="##-##-####"
                                                            value={data.data_cliente_chegada}
                                                            onChange={e => setData('data_cliente_chegada', e.target.value)}
                                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                        {errors.data_cliente_chegada && <div className="text-red-600">{errors.data_cliente_chegada}</div>}
                                                    </div>
                                                </div>
                                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="data_cb_envio"
                                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                        >
                                                            Data Envio CB
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <CurrencyFormat
                                                            format="##-##-####"
                                                            value={data.data_cb_envio}
                                                            onChange={e => setData('data_cb_envio', e.target.value)}
                                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                        {errors.data_cb_envio && <div className="text-red-600">{errors.data_cb_envio}</div>}
                                                    </div>
                                                </div>
                                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="cod_cb_rastreio"
                                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                        >
                                                            Código de Rastreio CB
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            id="cod_cb_rastreio"
                                                            value={data.cod_cb_rastreio}
                                                            onChange={e => setData('cod_cb_rastreio', e.target.value)}
                                                            name="cod_cb_rastreio"
                                                            autoComplete="cod_cb_rastreio"
                                                            className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                        />
                                                        {errors.cod_cb_rastreio && <div className="text-red-600">{errors.cod_cb_rastreio}</div>}
                                                    </div>
                                                </div>
                                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="data_cb_chegada"
                                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                        >
                                                            Data da Chegada no Cliente
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <CurrencyFormat
                                                            format="##-##-####"
                                                            value={data.data_cb_chegada}
                                                            onChange={e => setData('data_cb_chegada', e.target.value)}
                                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                        {errors.data_cb_chegada && <div className="text-red-600">{errors.data_cb_chegada}</div>}
                                                    </div>
                                                </div>

                                                {/* Project description */}
                                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="obs"
                                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                        >

                                                            Obs
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <textarea
                                                            id="obs"
                                                            name="obs"
                                                            rows={3}
                                                            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                                            value={data.obs}
                                                            onChange={e => setData('obs', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                           </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                                                    disabled={processing}>
                                                    Salvar
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
        </>
    )
}
