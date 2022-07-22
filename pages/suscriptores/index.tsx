import { NextPage } from 'next';
import Head from 'next/head';

import {
  useState,
  ChangeEvent,
  FormEvent,
} from 'react';

import Spinner from '@/components/Spinner';
import SearchInput from '@/components/SearchInput';
import NewSubscriberModal from '@/components/NewSubscriberModal';
import AppearTransition from '@/components/AppearTransition';

import { Subscriber } from '@/types';

import { XIcon, UserAddIcon } from '@heroicons/react/outline';

const Suscriptores: NextPage = () => {
  const [term, setTerm] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  /* new subscriber modal controls */
  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!term) return;

    setIsFetching(true);
    fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({ term }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(subs => {
        setIsFetching(false);
        setSubscribers(subs)
      });
  }

  function handleReset(e: FormEvent) {
    e.preventDefault();
    setTerm('');
  }

  const cleanTableResults = () => {
    setSubscribers([]);
    setTerm('');
  }

  function renderTableResults() {
    if (!isFetching && subscribers.length > 0) {
      return (
        <>
          <table className="table-auto w-full mt-6">
            <thead>
              <tr className="text-left border-b border-slate-100">
                <th className="p-4">Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>RFC</th>
                <th>Spouse</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map(({ name, email, phone, rfc, spouse }, index) => (
                <tr key={index} className="text-gray-600 border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 text-gray-800">{name}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>{rfc}</td>
                  <td>{spouse}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-row-reverse mt-6">
            <div
              className="px-4 py-3 text-gray-800 border border-gray-400 hover:bg-gray-100 cursor-pointer inline-flex items-center"
              onClick={cleanTableResults}
            >
              <XIcon className="w-5 h-5" />
              <span className="ml-2">Borrar resultados</span>
            </div>
          </div>
        </>
      )
    } else if (isFetching && subscribers.length === 0) {
      return (
        <>
          <div className="mx-auto max-w-2xl mt-6 select-none">
            <div className="inline-flex items-center text-gray-800 select-none">
              <Spinner />
              <p>Obteniendo resultados</p>
            </div>
          </div>
        </>
      )
    }
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

            <div className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white inline-flex items-center" onClick={openModal}>
              <UserAddIcon className="w-5 h-5" />
              <span className="ml-2">Agregar suscriptor</span>
            </div>

            {/* <Link href="/suscriptores/nuevo">
              <a>
                <div className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white inline-flex items-center">
                  <UserAddIcon className="w-5 h-5" />
                  <span className="ml-2">Agregar suscriptor</span>
                </div>
              </a>
            </Link> */}
          </div>

          <div className="bg-white p-6">

            <div className="mx-auto max-w-2xl">
              <SearchInput
                searchTerm={term}
                placeholder="B&uacute;squeda por Nombre o Calle"
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleReset={handleReset}
              />
            </div>

            <AppearTransition show={true}>
              {renderTableResults()}
            </AppearTransition>
          </div>
        </div>
      </div>

      <NewSubscriberModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );

};

export default Suscriptores;
