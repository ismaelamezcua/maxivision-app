import type { NextPage } from 'next';
import type { FormEvent, ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import SearchInput from '../components/SearchInput';
import type { Subscriber } from '../types';
import { Transition } from '@headlessui/react';

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
    setSearchTerm('');
    setSubscribers([]);
  }

  function renderTableResults() {
    if (subscribers.length === 0) {
      return (<h1 className="font-bold text-2xl">Use the search box to display data.</h1>)
    }

    return (
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
          {subscribers.map(subscriber => (
            <tr key={subscriber.key} className="border-b border-slate-200 hover:bg-slate-50">
              <td className="p-4">{subscriber.name}</td>
              <td>{subscriber.title}</td>
              <td>{subscriber.email}</td>
              <td>{subscriber.role}</td>
              <td>Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <>
      <div className="container mx-auto p-6 mt-8 bg-white rounded-lg">
        <div className="flex flex-row justify-between p-4">
          <h1 className="text-2xl font-semibold text-slate-800">Suscriptores</h1>

          <div className="max-w-lg w-full">
            <SearchInput searchTerm={searchTerm} handleSubmit={handleSubmit} handleReset={handleReset} handleChange={handleChange} />
          </div>
          <div className="bg-sky-700 rounded-lg px-4 py-3 text-white">
            Agregar suscriptor
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
