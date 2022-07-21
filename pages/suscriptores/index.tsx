import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import {
  useState,
  ChangeEvent,
  FormEvent,
  Fragment,
} from 'react';

import {
  Transition,
  Dialog,
} from '@headlessui/react';

import Spinner from '../../components/Spinner';
import SearchInput from '../../components/SearchInput';
import AppearTransition from '../../components/AppearTransition';

import { Subscriber } from '../../types';

import { XIcon, UserAddIcon } from '@heroicons/react/outline';

const Suscriptores: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
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
    setSearchTerm(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!searchTerm) return;

    setIsFetching(true);

    fetch('/api/subscribers', {
      method: 'POST',
      body: JSON.stringify({ searchTerm }),
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
    setSearchTerm('');
  }

  const cleanTableResults = () => {
    setSubscribers([]);
    setSearchTerm('');
  }

  function renderTableResults() {
    if (!isFetching && subscribers.length > 0) {
      return (
        <>
          <table className="table-auto w-full mt-6">
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
            <Spinner />
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
                searchTerm={searchTerm}
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

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden border-t-2 border-blue-600 bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="flex flex-row justify-between items-center"
                  >
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Nuevo suscriptor
                    </h3>

                    <div className="px-3 py-4 cursor-pointer" onClick={closeModal} title="Cerrar ventana">
                      <XIcon className="w-5 h-5" />
                    </div>

                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Ingresa los datos del nuevo suscriptor. Los campos opcionales vienen indicados con una leyenda.
                    </p>
                  </div>

                  <form>
                    <div className="form-field">
                      <label htmlFor="name" className="form-label">Nombre</label>
                      <input className="form-input" type="text" name="name" />
                    </div>

                    <div className="form-field mt-6">
                      <label htmlFor="email" className="form-label">Correo electr&oacute;nico</label>
                      <input className="form-input" type="email" name="email" />
                    </div>

                    <div className="form-field mt-6">
                      <label htmlFor="phone" className="form-label">Tel&eacute;fono</label>
                      <input className="form-input" type="text" name="phone" />
                    </div>

                    <div className="form-field mt-6">
                      <label htmlFor="rfc" className="form-label">RFC (opcional)</label>
                      <input className="form-input" type="text" name="rfc" />
                    </div>

                    <div className="form-field mt-6">
                      <label htmlFor="spouse" className="form-label">C&oacute;nyugue</label>
                      <input className="form-input" type="text" name="spouse" />
                    </div>

                    <div className="flex flex-row mt-6 max-w-xl mx-auto space-x-6 justify-end">
                      <button
                        type="reset"
                        className="border border-gray-400 hover:bg-gray-100 px-4 py-3 text-gray-800 inline-flex items-center">
                        <UserAddIcon className="w-5 h-5" />
                        <span className="ml-2">Limpiar formulario</span>
                      </button>

                      <button className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white inline-flex items-center">
                        <UserAddIcon className="w-5 h-5" />
                        <span className="ml-2">Crear usuario</span>
                      </button>
                    </div>
                  </form>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>


    </>
  );

};

export default Suscriptores;
