import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
// import CurrencyFormat from "react-currency-format";
import {useForm} from '@inertiajs/react';
import moment from "moment";
import InputMask from "react-input-mask";


export default function ShippingEdit({order,items,shipping}) {
    const [open, setOpen] = useState(false)

    const { data, setData, post, processing, errors } = useForm({
        previsao_envio: shipping.previsao_envio ? moment(shipping.previsao_envio).format('DD-MM-YYYY'): '',
        data_envio: shipping.data_envio ? moment(shipping.data_envio).format('DD-MM-YYYY'): '',
        data_entrega: shipping.data_entrega ? moment(shipping.data_entrega).format('DD-MM-YYYY'): '',
        entregue: shipping.entregue,
        cod_rastreio: shipping.cod_rastreio,
        obs: shipping.obs,
    })

    function submit(e) {
        e.preventDefault()
        post(route("shipping.update",{shipping:shipping.id}));
        setOpen(false)
    }

    return (
        <>

            <button
                type="button"
                className="w-full my-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => setOpen(true)}
            >
                editar
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
                                                    <div className="sm:col-span-2">
                                                        <div className="mt-1">
                                                            <InputMask
                                                                mask='99-99-9999'
                                                                value={data.previsao_envio}
                                                                onChange={e => setData('previsao_envio', e.target.value)}
                                                                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                            >
                                                            </InputMask>
                                                        </div>
                                                        {errors.previsao_envio && <div className="text-red-600">{errors.previsao_envio}</div>}
                                                    </div>
                                                </div>
                                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="data_envio"
                                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                        >
                                                            Data de envio
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <CurrencyFormat
                                                            format="##-##-####"
                                                            value={data.data_envio}
                                                            onChange={e => setData('data_envio', e.target.value)}
                                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                        {errors.data_envio && <div className="text-red-600">{errors.data_envio}</div>}
                                                    </div>
                                                </div>
                                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="data_entrega"
                                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                        >
                                                            Data da Entrega
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <CurrencyFormat
                                                            format="##-##-####"
                                                            value={data.data_entrega}
                                                            onChange={e => setData('data_entrega', e.target.value)}
                                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                        {errors.data_entrega && <div className="text-red-600">{errors.data_entrega}</div>}
                                                    </div>
                                                </div>

                                                {/* Project description */}
                                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="project-description"
                                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                        >
                                                            {' '}
                                                            Description{' '}
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <textarea
                                                            id="project-description"
                                                            name="project-description"
                                                            rows={3}
                                                            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                                            defaultValue={''}
                                                        />
                                                    </div>
                                                </div>
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
