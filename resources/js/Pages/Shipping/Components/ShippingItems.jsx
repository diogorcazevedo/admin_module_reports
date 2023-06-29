import React, { Fragment, useState } from 'react'
import {Link} from '@inertiajs/react';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'



export default function ShippingItems({order,items,shipping}) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                type="button"
                className="w-full my-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => setOpen(true)}
            >
                produtos
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
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900"> Gestão de Envio de Itens </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-teal-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500">
                                            Produtos enviados
                                        </div>
                                        <ul role="list" className="flex-1 divide-y divide-gray-200 overflow-y-auto">
                                            {shipping.shipping_items.map((item) => (
                                                <li key={item.id}>
                                                    <div className="group relative flex items-center py-6 px-5">
                                                        <a href="#" className="-m-1 block flex-1 p-1">
                                                            <div className="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true" />
                                                            <div className="relative flex min-w-0 flex-1 items-center">
                                                                <div className="ml-4 truncate">
                                                                    <p className="truncate text-sm font-medium text-gray-900">{item.product.name}</p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <div as="div" className="relative ml-2 inline-block flex-shrink-0 text-left">
                                                            <div className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                                                                <Link href={route('shipping.destroy.item',{shippingItems:item.id})}
                                                                    type="button"
                                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
                                                                    >
                                                                    remover
                                                                </Link>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500">
                                            Produtos vendidos
                                        </div>
                                        <ul role="list" className="flex-1 divide-y divide-gray-200 overflow-y-auto">
                                            {items.map((item) => (
                                                <li key={item.id}>
                                                    <div className="group relative flex items-center py-6 px-5">
                                                        <a href="#" className="-m-1 block flex-1 p-1">
                                                            <div className="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true" />
                                                            <div className="relative flex min-w-0 flex-1 items-center">
                                                                <div className="ml-4 truncate">
                                                                    <p className="truncate text-sm font-medium text-gray-900">{item.product.name}</p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <div as="div" className="relative ml-2 inline-block flex-shrink-0 text-left">
                                                            <div className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                                                                <Link href={route('shipping.add.item',{shipping:shipping.id,product:item.product.id})}
                                                                      type="button"
                                                                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                                                >
                                                                    Add
                                                                </Link>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
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
