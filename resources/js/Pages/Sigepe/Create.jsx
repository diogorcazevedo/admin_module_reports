import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage, useForm} from '@inertiajs/react';
import InputMask from "react-input-mask";
import axios from "axios";

export default function Create({}) {


    const {auth} = usePage().props


    const { data, setData, post, processing, errors} = useForm({
        destinatario: '',
        cel: '',
        address: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        dimensao: '',

    })

    function submit(e) {
        e.preventDefault()
        post(route("sigepe.store"));

    }

    const searchCep = (setData,e) =>{

        const cep = e.target.value;

        const url_cep = 'https://viacep.com.br/ws/'+ cep + '/json/';
        axios.defaults.headers.common = null
        axios.get(url_cep).then(function (response) {

            const dt = {
                destinatario:   document.getElementById("destinatario").value,
                cel:            document.getElementById("cel").value,
                dimensao:       document.getElementById("dimensao").value,
                zipcode:        e.target.value,
                address:        response.data.logradouro,
                neighborhood:   response.data.bairro,
                city:           response.data.localidade,
                state:          response.data.uf
            };

            setData(dt);

        }.bind(this)).catch(function (error) {
            console.log(error);
            alert("Formato de CEP inválido.");
        });
    }

    return (
        <>
            <Head title="sigepes" />
            <Auth auth={auth} errors={errors} >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">

                    <form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl" onSubmit={submit}>
                        <div className="flex-1">
                            {/* Header */}
                            <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                <div className="flex items-start justify-between space-x-3">
                                    <div className="space-y-1">
                                        <p className="text-lg font-medium text-gray-900"> Novo Envio SIGEPE </p>
                                    </div>
                                </div>
                            </div>

                            {/* Divider container */}
                            <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                                {/* Project name */}
                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                    <div>
                                        <label
                                            htmlFor="dimensao"
                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                        >
                                            Tipo
                                        </label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <select
                                            name="dimensao"
                                            required="required"
                                            id="dimensao"
                                            onChange={e => setData('dimensao', e.target.value)}
                                            value={data.dimensao}
                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option></option>
                                            <option  value="1">TIPO 1</option>
                                            <option  value="2">TIPO 2</option>
                                            <option  value="3">TIPO 3</option>

                                        </select>
                                        {errors.dimensao && <div className="text-red-600">{errors.dimensao}</div>}
                                    </div>
                                </div>
                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                        >
                                            Destinatário
                                        </label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <input
                                            type="text"
                                            id="destinatario"
                                            value={data.destinatario}
                                            onChange={e => setData('destinatario', e.target.value)}
                                            name="destinatario"
                                            autoComplete="destinatario"
                                            className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                        />
                                        {errors.destinatario && <div className="text-red-600">{errors.destinatario}</div>}
                                    </div>
                                </div>
                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                    <div>
                                        <label
                                            htmlFor="cel"
                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                        >
                                            Cel
                                        </label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <input
                                            type="text"
                                            id="cel"
                                            name="cel"
                                            value={data.cel}
                                            onChange={e => setData('cel', e.target.value)}
                                            autoComplete="cel"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                        />
                                        {errors.cel && <div className="text-red-600">{errors.cel}</div>}
                                    </div>
                                </div>
                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                    <div>
                                        <label
                                            htmlFor="zipcode"
                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                        >
                                            CEP
                                        </label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <InputMask
                                            type="text"
                                            id="zipcode"
                                            mask="99999999"
                                            // onBlur={searchCep}
                                            onBlur={(e) => searchCep(setData, e)}
                                            name="zipcode"
                                            autoComplete="zipcode"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                        ></InputMask>
                                        {errors.zipcode && <div className="text-red-600">{errors.zipcode}</div>}
                                    </div>
                                </div>
                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                    <div>
                                        <label
                                            htmlFor="address"
                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                        >
                                            Address
                                        </label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            value={data.address}
                                            onChange={e => setData('address', e.target.value)}
                                            autoComplete="address"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                        />
                                        {errors.address && <div className="text-red-600">{errors.address}</div>}
                                    </div>
                                </div>
                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                    <div>
                                        <label
                                            htmlFor="number"
                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                        >
                                            Número
                                        </label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <input
                                            type="text"
                                            name="number"
                                            id="number"
                                            value={data.number}
                                            onChange={e => setData('number', e.target.value)}
                                            autoComplete="number"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                        />
                                        {errors.number && <div className="text-red-600">{errors.number}</div>}
                                    </div>
                                </div>
                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                    <div>
                                        <label
                                            htmlFor="complement"
                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                        >
                                            Complemento
                                        </label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <input
                                            type="text"
                                            id="complement"
                                            name="complement"
                                            value={data.complement}
                                            onChange={e => setData('complement', e.target.value)}
                                            autoComplete="complement"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                        />
                                        {errors.complement && <div className="text-red-600">{errors.complement}</div>}
                                    </div>
                                </div>
                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                    <div>
                                        <label
                                            htmlFor="neighborhood"
                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                        >
                                            Bairro
                                        </label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <input
                                            type="text"
                                            id="neighborhood"
                                            name="neighborhood"
                                            value={data.neighborhood}
                                            onChange={e => setData('neighborhood', e.target.value)}
                                            autoComplete="neighborhood"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                        />
                                        {errors.neighborhood && <div className="text-red-600">{errors.neighborhood}</div>}
                                    </div>
                                </div>
                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                    <div>
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                        >
                                            Cidade
                                        </label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <input
                                            required
                                            type="text"
                                            id="city"
                                            value={data.city}
                                            onChange={e => setData('city', e.target.value)}
                                            name="city"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                        />
                                        {errors.city && <div className="text-red-600">{errors.city}</div>}
                                    </div>
                                </div>
                                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                    <div>
                                        <label
                                            htmlFor="state"
                                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                        >
                                            Estado
                                        </label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <InputMask
                                            required
                                            type="text"
                                            id="state"
                                            mask="aa"
                                            value={data.state}
                                            onChange={e => setData('state', e.target.value)}
                                            name="state"
                                            className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                        ></InputMask>
                                        {errors.state && <div className="text-red-600">{errors.state}</div>}
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

                </div>
            </Auth>
        </>

    );
}
