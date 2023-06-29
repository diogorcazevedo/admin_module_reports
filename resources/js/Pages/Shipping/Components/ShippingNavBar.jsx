import React from 'react';
import {Link} from '@inertiajs/react';



export default function ShippingNavBar({order,user}) {

    const tabs = [
        { name: 'INFORMAÇÕES GERAIS', href: route('shipping.index',{order:order.id}), current: true },
        { name: 'ENVIOS', href: route('shipping.get_all',{order:order.id}), current: false },
        { name: 'SIGEPE', href: route('shipping.sigepe.index',{order:order.id}), current: false },
        { name: 'REVERSO', href: route('shipping.reverse.logistic.show',{order:order.id}), current: false },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-6 pb-4 sticky fixed top-0 z-20 bg-white">
                <div className="border-b border-gray-200">
                    <div className="sm:flex sm:items-baseline">
                        <h3 className=" leading-6 font-medium text-gray-900">
                            <Link href={route('user.edit',{user:user.id})}>
                                {user.name}
                            </Link>
                        </h3>
                        <div className="mt-4 sm:mt-0 sm:ml-10">
                            <nav className="-mb-px flex space-x-8">
                                {tabs.map((tab) => (
                                    <Link
                                        key={tab.name}
                                        href={tab.href}
                                        className={classNames(
                                            tab.current
                                                ? 'border-teal-500 text-teal-600'
                                                : 'border-transparent text-teal-900 hover:text-gray-400 hover:border-teal-800',
                                            'whitespace-nowrap pb-4 px-1 border-b-2 font-medium'
                                        )}
                                        aria-current={tab.current ? 'page' : undefined}
                                    >
                                        {tab.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
