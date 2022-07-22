import { FC, ReactElement, useState, ReactNode, ChangeEvent, FormEvent } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import SearchInput from '@/components/SearchInput';
import { PlusIcon, UserAddIcon } from '@heroicons/react/outline';

const Contratos: NextPage = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!searchTerm) return;

    alert(`Searching ${searchTerm}`);
  }

  function handleReset(e: FormEvent) {
    e.preventDefault();
    setSearchTerm('');
  }

  return (
    <>
      <Head>
        <title>Maxivision - Contratos</title>
      </Head>

      <div className="container mx-auto max-w-6xl mt-6">
        <div className="flex flex-col space-y-6">

          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">Contratos</h1>
            <div className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white inline-flex items-center">
              <PlusIcon className="w-5 h-5" />
              <span className="ml-2">Nuevo contrato</span>
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

          </div>
        </div>
      </div>
    </>
  );
}

export default Contratos;
