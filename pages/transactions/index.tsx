import { useState, ChangeEvent, FormEvent } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { CalendarIcon, XIcon } from '@heroicons/react/outline';

import { Transaction } from '@/types';
import ResultsAndTotal from '@/components/transactions/ResultsAndTotal';

const TransactionsPage: NextPage = () => {
  const [date, setDate] = useState<string>('');
  const [results, setResults] = useState<Transaction[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target.value;
    setDate(target);

    fetch('/api/transactions/search', {
      method: 'POST',
      body: JSON.stringify({ date: target }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(results => {
        setResults(results);
      });
  }

  function handleReset(e: FormEvent) {
    e.preventDefault();
    setDate('');
  }

  const cleanTableResults = () => {
    setResults([]);
    setDate('');
  }

  return (
    <>
      <Head>
        <title>Maxivision - Movimientos</title>
      </Head>

      <div className="container mx-auto max-w-6xl mt-6">
        <div className="flex flex-col space-y-6">

          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-slate-700">Movimientos por d&iacute;a</h1>
          </div>

          <div className="bg-white p-6 shadow-md">
            <div className="mx-auto max-w-2xl">
              <form
                method="POST"
                className="w-full relative"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 cursor-pointer">
                  <CalendarIcon
                    className={`${date ? 'text-blue-600' : 'text-blue-700'} w-5 h-5`}
                  />
                </span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer ">
                  {date
                    ? <XIcon className="w-5 h-5 hover:bg-gray-50" onClick={handleReset} />
                    : <></>
                  }
                </span>

                <input
                  type="date"
                  className="w-full border-gray-400 focus:border-blue-700 px-12 py-3"
                  name="term"
                  value={date}
                  onChange={handleChange}
                  required
                />
              </form>
            </div>

            <ResultsAndTotal
              isFetching={isFetching}
              transactions={results}
              handleCleanResults={cleanTableResults}
            />

          </div>
        </div>
      </div>
    </>
  );

};

export default TransactionsPage;
