import React, { Fragment, useState } from 'react'
import {Dialog, Transition} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {orderBy} from "lodash";


export default function SlideCategoryProductsSortByOrders({category , products}) {
    const [open, setOpen] = useState(false)
    const sorted = orderBy(products, ["orders"], 'desc');
    let count = 0;
    return (
        <>
            <div className="p-2">
                <button onClick={() => setOpen(true)} className=" w-full inline-flex text-base font-medium border border-transparent items-center px-2.5 py-1.5 text-xs font-medium rounded text-white bg-teal-800 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    <span className="text-white group-hover:text-gray-700 text-xs">produtos</span>
                </button>
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-teal-600"> Categoria {category} </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                                                    <div className="mt-6 grid grid-cols-1 gap-4 justify-end">
                                                        <table className="border mt-2 min-w-full divide-y divide-x divide-gray-200">
                                                            <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                                                            <tr className="divide-x divide-y divide-gray-200">
                                                                <th  width="5%" className="text-gray-900 p-2">Count</th>
                                                                <th  className="text-gray-900 p-2">Vendas</th>
                                                                <th  width="50%" className="text-gray-900 p-2">Coleção</th>
                                                                <th  width="25%" className="text-gray-900 p-2">Total</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-x divide-gray-200 bg-white">
                                                            {Object.values(sorted).map((item,index) => (
                                                                <tr key={index} className="divide-x divide-y divide-gray-200">
                                                                    <td className="text-xs p-2">{count = count + 1}</td>
                                                                    <td className="text-xs p-2">{item?.orders}</td>
                                                                    <td className="text-xs p-2">{item?.product}</td>
                                                                    <td className="text-xs p-2"> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item?.total) }</td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

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
