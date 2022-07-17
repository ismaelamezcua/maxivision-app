import type { NextPage } from 'next';
import Head from 'next/head';
import type { FormEvent, ChangeEvent } from 'react';
import { useState, useEffect, Fragment } from 'react';
import SearchInput from '../components/SearchInput';
import type { Subscriber } from '../types';
import { Dialog, Transition } from '@headlessui/react';
import { UserAddIcon } from '@heroicons/react/outline';
import AppearTransition from '../components/AppearTransition';

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  // useEffect(() => {
  //   fetch('/api/subscribers')
  //     .then(response => response.json())
  //     .then(subscribers => setSubscrbiers(subscribers));
  // }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!searchTerm) return;

    fetch('/api/subscribers', {
      method: 'POST',
      body: JSON.stringify({ searchTerm }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(subs => setSubscribers(subs));
  }

  function handleReset(e: FormEvent) {
    e.preventDefault();
    setSearchTerm('');
  }

  const cleanTableResults = () => {
    setSubscribers([]);
    setSearchTerm('');
  }

  function renderTableResults() {
    // if (subscribers.length === 0) {
    //   return (<h1 className="font-bold text-2xl">Use the search box to display data.</h1>)
    // }

    return (
      <AppearTransition show={subscribers.length > 0}>
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left border-b border-slate-100">
              <th className="p-4">Name</th>
              <th>Title</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map(({ name, title, email, role }, index) => (
              <tr key={index} className="text-gray-600 border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 text-gray-800">{name}</td>
                <td>{title}</td>
                <td>{email}</td>
                <td>{role}</td>
                <td>Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AppearTransition>
    )
  }

  return (
    <>
      <Head>
        <title>Maxivision - Suscriptores</title>
      </Head>

      <div className="container mx-auto max-w-6xl mt-6">
        <div className="flex flex-col space-y-6">

          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">Suscriptores</h1>
            <div className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white inline-flex items-center">
              <UserAddIcon className="w-5 h-5" />
              <span className="ml-2">Agregar suscriptor</span>
            </div>
          </div>

          <div className="bg-white p-6">

            <div className="mx-auto max-w-2xl">
              <SearchInput
                searchTerm={searchTerm}
                placeholder="B&uacute;squeda por Suscriptor o Calle"
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleReset={handleReset}
              />
            </div>

            {renderTableResults()}

          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 mt-8 bg-white rounded-lg">
        <div className="flex flex-row justify-between p-4">
          <h1 className="text-2xl font-semibold text-slate-800">Suscriptores</h1>

          <div className="max-w-lg w-full">
            <SearchInput
              searchTerm={searchTerm}
              placeholder="B&uacute;squda por Nombre o Calle"
              handleSubmit={handleSubmit}
              handleReset={handleReset}
              handleChange={handleChange}
            />
          </div>

          <div className="bg-sky-700 rounded-lg px-4 py-3 text-white flex flex-inline items-center">
            <UserAddIcon className="w-5 h-5" />
            <span className="ml-2">Agregar suscriptor</span>
          </div>

        </div>

        <Transition
          show={searchTerm.length > 0 && subscribers.length > 0}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {renderTableResults()}

          <div className="flex flex-row-reverse p-4">
            <div className="bg-sky-700 rounded-lg px-4 py-3 text-white cursor-pointer" onClick={cleanTableResults}>
              Borrar resultados
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
}

export default Home;
