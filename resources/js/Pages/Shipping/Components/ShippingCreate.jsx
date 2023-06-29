import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
// import CurrencyFormat from "react-currency-format";
import {useForm} from '@inertiajs/react';
import moment from "moment";


export default function ShippingCreate({order,items,types}) {
    const [open, setOpen] = useState(false)

    const { data, setData, post, processing, errors } = useForm({
        previsao_envio:moment().format('DD-MM-YYYY'),
        products: [],
        type_id: '',
        cod_rastreio: '',
        obs:'',
    })


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


    function submit(e) {
        e.preventDefault()
        post(route("shipping.store",{order:order.id}));

    }

    return (
        <>
            <button
                type="button"
                className="inline-block w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
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
                                                        <Dialog.Title className="text-lg font-medium text-gray-900"> Novo Envio </Dialog.Title>
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
                                                {/* Project name */}

                                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="cod_rastreio"
                                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                        >
                                                            Código de Rastreio
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            id="cod_rastreio"
                                                            value={data.cod_rastreio}
                                                            onChange={e => setData('cod_rastreio', e.target.value)}
                                                            name="cod_rastreio"
                                                            autoComplete="cod_rastreio"
                                                            className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                        />
                                                        {errors.cod_rastreio && <div className="text-red-600">{errors.cod_rastreio}</div>}
                                                    </div>
                                                </div>
                                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="data_entrega"
                                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                        >
                                                            Previsão de envio
                                                        </label>
                                                    </div>
                                                    <h2>{data.previsao_envio}</h2>
                                                    {/*<div className="sm:col-span-2">*/}
                                                    {/*    <CurrencyFormat*/}
                                                    {/*        format="##-##-####"*/}
                                                    {/*        value={data.previsao_envio}*/}
                                                    {/*        onChange={e => setData('previsao_envio', e.target.value)}*/}
                                                    {/*        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"*/}
                                                    {/*    />*/}
                                                    {/*    {errors.previsao_envio && <div className="text-red-600">{errors.previsao_envio}</div>}*/}
                                                    {/*</div>*/}
                                                </div>
                                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="data_entrega"
                                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                        >
                                                            Tipo de Entrega
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <select
                                                            name="type_id"
                                                            required="required"
                                                            id="type_id"
                                                            onChange={e => setData('type_id', e.target.value)}
                                                            value={data.type_id}
                                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                            <option></option>
                                                            {types.map((type, index) => {
                                                                return (
                                                                    <option key={index} value={type.id}>
                                                                        {type.name}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                        {errors.type_id && <div className="text-red-600">{errors.type_id}</div>}
                                                    </div>
                                                </div>
                                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="obs"
                                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                        >
                                                            Observações
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <textarea
                                                            id="obs"
                                                            name="obs"
                                                            rows={3}
                                                            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                                            onChange={e => setData('obs', e.target.value)}
                                                            value={data.obs}
                                                        />
                                                        {errors.obs && <div className="text-red-600">{errors.obs}</div>}
                                                    </div>
                                                </div>
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
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    type="button"
                                                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                                                    disabled={processing}>
                                                    SALVAR
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
