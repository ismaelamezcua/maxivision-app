import type { NextPage } from 'next';
import type { FormEvent, ChangeEvent } from 'react';
import { useState } from 'react';
import SearchInput from '../components/SearchInput';

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const tempSubscribers = [
    { key: '1', name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { key: '2', name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
    { key: '3', name: 'Tom Cook', title: 'Director, Product Development', email: 'tom.cook@example.com', role: 'Member' },
    { key: '4', name: 'Whitney Francis', title: 'Copywriter', email: 'whitney.francis@example.com', role: 'Admin' },
    { key: '5', name: 'Leonard Krasner', title: 'Senior Designer', email: 'leonard.krasner@example.com', role: 'Owner' },
    { key: '6', name: 'Floyd Miles', title: 'Principal Designer', email: 'floyd.miles@example.com', role: 'Member' },
  ];

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
            {tempSubscribers.map(user => (
              <tr key={user.key} className="border-b border-slate-200 hover:bg-slate-50">
                <td className="p-4">{user.name}</td>
                <td>{user.title}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>Edit</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
}

export default Home;
