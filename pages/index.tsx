import type { NextPage } from 'next';
import type { FormEvent, ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import SearchInput from '../components/SearchInput';
import type { Subscriber } from '../types';

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subscribers, setSubscrbiers] = useState<Subscriber[]>([]);

  useEffect(() => {
    fetch('/api/subscribers')
      .then(response => response.json())
      .then(subscribers => setSubscrbiers(subscribers));
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: Do request to search for the subscriber
    console.log(searchTerm);
  }

  function handleReset(e: FormEvent) {
    e.preventDefault();
    setSearchTerm('');
  }

  function renderTableResults() {
    return (
      subscribers.map(subscriber => (
        <tr key={subscriber.key} className="border-b border-slate-200 hover:bg-slate-50">
          <td className="p-4">{subscriber.name}</td>
          <td>{subscriber.title}</td>
          <td>{subscriber.email}</td>
          <td>{subscriber.role}</td>
          <td>Edit</td>
        </tr>
      ))
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
            {renderTableResults()}
          </tbody>
        </table>

      </div>
    </>
  );
}

export default Home;
