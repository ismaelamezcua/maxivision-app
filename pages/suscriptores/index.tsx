import { NextPage } from 'next';
import Head from 'next/head';

import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from 'react';

import SearchInput from '@/components/SearchInput';
import ResultsTable from '@/components/subscribers/ResultsTable';
import NewSubscriberModal from '@/components/subscribers/NewSubscriberModal';

import { Subscriber } from '@/types';

import { UserAddIcon } from '@heroicons/react/outline';

const Suscriptores: NextPage = () => {
  const [term, setTerm] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Check if localStorage has the searchResults object stored
  useEffect(() => {
    const searchResults = localStorage.getItem('searchResults');
    if (searchResults !== null) {
      setSubscribers(JSON.parse(searchResults));
    }
  }, []);

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
      .then(response => response.json())
      .then(subscribers => {
        setSubscribers(subscribers)
        localStorage.setItem('searchResults', JSON.stringify(subscribers));
        setIsFetching(false);
      });
  }

  function handleReset(e: FormEvent) {
    e.preventDefault();
    setTerm('');
  }

  const cleanTableResults = () => {
    setSubscribers([]);
    localStorage.removeItem('searchResults');
    setTerm('');
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

            <ResultsTable
              isFetching={isFetching}
              subscribers={subscribers}
              handleCleanResults={cleanTableResults}
            />
          </div>
        </div>
      </div>

      <NewSubscriberModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );

};

export default Suscriptores;
