import React, { Fragment, useState } from 'react'
import {Dialog, Menu, Transition} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon,ChartBarIcon } from '@heroicons/react/20/solid'
import {Link} from '@inertiajs/react';



export default function SlideGetRouteAndYear({get_route,label=""}) {
    const [open, setOpen] = useState(false)

    console.log(get_route);
    return (
        <>
            <button onClick={() => setOpen(true)}
                    className="group inline-flex text-base font-medium border border-transparent items-center px-2.5 py-1.5 text-xs font-medium rounded text-white bg-teal-800 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                <ChartBarIcon
                    className="mr-2 h-4 w-4 flex-shrink-0 text-white group-hover:text-gray-500"
                    aria-hidden="true"
                />
                <span className="text-white group-hover:text-gray-700 text-xs">{label}</span>
            </button>
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
                                                    <Dialog.Title className="text-lg font-medium text-teal-600"> Selecionar mês e ano </Dialog.Title>
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
                                                        <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                                                            <Link href={route(get_route,{year:'2017'})}  className="focus:outline-none">
                                                                <span className="absolute inset-0" aria-hidden="true" />
                                                                <p className="text-sm font-medium text-gray-900">2017</p>
                                                            </Link>
                                                        </div>
                                                        <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                                                            <Link href={route(get_route,{year:'2018'})}  className="focus:outline-none">
                                                                <span className="absolute inset-0" aria-hidden="true" />
                                                                <p className="text-sm font-medium text-gray-900">2018</p>
                                                            </Link>
                                                        </div>
                                                        <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                                                            <Link href={route(get_route,{year:'2019'})}  className="focus:outline-none">
                                                                <span className="absolute inset-0" aria-hidden="true" />
                                                                <p className="text-sm font-medium text-gray-900">2019</p>
                                                            </Link>
                                                        </div>
                                                        <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                                                            <Link href={route(get_route,{year:'2020'})}  className="focus:outline-none">
                                                                <span className="absolute inset-0" aria-hidden="true" />
                                                                <p className="text-sm font-medium text-gray-900">2020</p>
                                                            </Link>
                                                        </div>
                                                        <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                                                            <Link href={route(get_route,{year:'2021'})}  className="focus:outline-none">
                                                                <span className="absolute inset-0" aria-hidden="true" />
                                                                <p className="text-sm font-medium text-gray-900">2021</p>
                                                            </Link>
                                                        </div>
                                                        <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                                                            <Link href={route(get_route,{year:'2022'})}  className="focus:outline-none">
                                                                <span className="absolute inset-0" aria-hidden="true" />
                                                                <p className="text-sm font-medium text-gray-900">2022</p>
                                                            </Link>
                                                        </div>
                                                        <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                                                            <Link href={route(get_route,{year:'2023'})}  className="focus:outline-none">
                                                                <span className="absolute inset-0" aria-hidden="true" />
                                                                <p className="text-sm font-medium text-gray-900">2023</p>
                                                            </Link>
                                                        </div>
                                                        <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                                                            <Link href={route(get_route,{year:'2024'})}  className="focus:outline-none">
                                                                <span className="absolute inset-0" aria-hidden="true" />
                                                                <p className="text-sm font-medium text-gray-900">2024</p>
                                                            </Link>
                                                        </div>
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
