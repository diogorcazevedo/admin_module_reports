import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {useForm} from '@inertiajs/react';
import axios from "axios";
import InputMask from "react-input-mask";
import moment from "moment";
// import CurrencyFormat from "react-currency-format";


export default function ShippingSigepe({order,items,user}) {
    const [open, setOpen] = useState(false)

    const { data, setData, post, processing, errors} = useForm({
        order_id:       order.id,
        user_id:        user.id,
        destinatario:   user.name,
        cel:            user.cel,
        zipcode:        user.zipcode,
        address:        user.address,
        number:         user.number,
        complement:     user.complement,
        neighborhood:   user.neighborhood,
        city:           user.city? user.city.name: null,
        state:          user.state? user.state.name:null,
        dimensao:       1,
        type_id:        2,
        previsao_envio  :moment().format('DD-MM-YYYY'),
        obs:'',
        products: [],

    })

    function submit(e) {
        e.preventDefault()
        post(route("shipping.sigepe.store",{order:order.id}));
        //setOpen(false);
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
            <button
                type="button"
                className="inline-block w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => setOpen(true)}
            >
                sigepe
            </button>
            <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setOpen}>
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
                                                <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                                                    {/* Privacy */}
                                                   <fieldset className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                        <legend className="sr-only">Privacy</legend>
                                                        <div className="text-sm font-medium text-gray-900" aria-hidden="true">
                                                            Itens
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
                                                    {errors.products && <div className="text-red-600">{errors.products}</div>}

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
                                                               // onLoad={(e) => searchCep(setData, e)}
                                                                name="zipcode"
                                                                value={data.zipcode}
                                                                onChange={e => setData('zipcode', e.target.value)}
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
                                                    <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                        <div>
                                                            <label
                                                                htmlFor="data_entrega"
                                                                className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                            >
                                                                Previsão de envio
                                                            </label>
                                                        </div>
                                                        <h1>{data.previsao_envio}</h1>
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
