import React from 'react';
import { Link }  from '@inertiajs/react';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function menuItems(year){
    let menuItems = [];
    let y = year;

    for (let i = 1; i < 13; i++) {
        menuItems.push(
            <Menu.Item key={i}>
                {({ active }) => (
                    <Link
                        href={route('sales.index',{year:y,month:i})}
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900 z-50' : 'text-gray-700 z-50',
                            'block px-4 py-2 text-sm z-50'
                        )}
                    >
                        {i}/{y}
                    </Link>
                )}
            </Menu.Item>
        );
    }
    return menuItems;
}


export default function SelectSalesForYearAndMonth({get_month, get_year}) {
    return (
            <>
                <div className="shadow mt-6 p-4 flex flex-row">
                    <div className="basis-5/5 ">
                            <span className="inline-flex items-center px-1 pt-1 mr-2 leading-5">
                                <span className="font-semibold text-gray-800 leading-tight">VENDAS: {get_month}/{get_year}</span>
                            </span>
                            <Menu as="div" className="relative inline-block text-left mt-1 mr-2 ">
                                <div>
                                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
                                         Vendas 2020
                                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1 z-50">
                                            {menuItems('2020')}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            <Menu as="div" className="relative inline-block text-left mt-1 mr-2 ">
                                <div>
                                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
                                         Vendas 2021
                                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1 z-50">
                                            {menuItems('2021')}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            <Menu as="div" className="relative inline-block text-left mt-1 mr-2 ">
                                <div>
                                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
                                         Vendas 2022
                                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1 z-50">
                                            {menuItems('2022')}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            <Menu as="div" className="relative inline-block text-left mt-1 mr-2 ">
                                <div>
                                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
                                         Vendas 2023
                                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {menuItems('2023')}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>

                    <div className="basis-1/5 ">
                        <div className="flex flex-row-reverse">
                            <Link href={route("report.sale.index")} className="w-full mt-1 inline-flex items-center px-2.5 py-1.5 border border-transparent font-medium rounded text-white bg-teal-800 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                relatórios
                            </Link>
                        </div>
                    </div>
                </div>
            </>
    );
}
