import { FC, ReactElement } from 'react';

import Link from 'next/link';

import { PlusIcon } from '@heroicons/react/outline';

import { Transaction } from '@/types';
import AppearTransition from '@/components/AppearTransition';

const TransactionsDetails: FC<{ transactions: Transaction[] }> = ({ transactions }): ReactElement => {
  return (
    <>
      <div className="container mx-auto max-w-6xl my-6">
        <div className="flex flex-col space-y-6">

          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-slate-600">Pagos</h1>

            <div
              className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white inline-flex items-center cursor-pointer"
              onClick={() => alert('Show Transactions Dialog')}
            >
              <PlusIcon className="w-5 h-5" />
              <span className="ml-2">Generar pago</span>
            </div>
          </div>
        </div>

      </div>

      <div className="container mx-auto max-w-6xl my-6">
        <div className="bg-white p-6">
          <AppearTransition show={true}>
            <table className="table-auto w-full mt-6">
              <thead>
                <tr className="text-left border-b border-slate-100">
                  <th className="p-4">Fecha</th>
                  <th>Tipo</th>
                  <th>Costo</th>
                  <th>Concepto</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(({ id, createdAt, type, price, concept }, index) => (
                  <Link key={index} href={`/transactions/${id}`}>
                    <tr className="text-gray-600 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                      <td className="p-4 text-black">{createdAt}</td>
                      <td>{type}</td>
                      <td>{price}</td>
                      <td>{concept}</td>
                    </tr>
                  </Link>
                ))}
              </tbody>
            </table>
          </AppearTransition>
        </div>
      </div>
    </>
  );
}

export default TransactionsDetails;
