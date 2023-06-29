import React from 'react';
import {Link} from '@inertiajs/react';

export default function SigepeList({sigepes}) {


    return (
        <>

           <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">

               <h3 className="text-lg mt-6">SIGEPE</h3>

                    <table className="shadow-sm border mt-8 min-w-full divide-y divide-x divide-gray-200">
                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                        <tr className="divide-x divide-y divide-gray-200">
                            <th  className="text-gray-900 p-2">ID</th>
                            <th  className="text-gray-900 p-2">DESTINATÁRIO</th>
                            <th  className="text-gray-900 p-2">
                                <Link href={route('sigepe.create')} className="inline-block w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    NOVO
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                    {sigepes?.map((sigepe) => (
                        <tr key={sigepe.id} className="divide-x divide-y divide-gray-200">
                            <td className="text-sm p-2">{sigepe.id}</td>
                            <td  className="text-gray-900 p-2">
                                {sigepe.destinatario}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {/*
                                <a  href="'/sigepe/'+sigepe.id+'.pdf'" className="text-teal-600 hover:text-teal-900" target="_blank">
                                    imprimir
                                </a>
                                */}
                                <a href={'/online/sigepe/'+sigepe.etiqueta+'.pdf'}  className="text-teal-600 hover:text-teal-900"  >
                                imprimir
                            </a>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                </div>

        </>

    );
}
