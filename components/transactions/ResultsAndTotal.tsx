import { FC, ReactElement } from 'react';

import { XIcon } from '@heroicons/react/outline';

import { Transaction } from '@/types';
import Spinner from '@/components/Spinner';
import AppearTransition from '../AppearTransition';

interface TableProps {
  transactions: Transaction[];
  isFetching: boolean;
  handleCleanResults: () => void;
}

const ResultsAndTotal: FC<TableProps> = (props): ReactElement => {
  const { transactions, isFetching, handleCleanResults } = props;
  let total = transactions.reduce((accumulator, object) => {
    return accumulator + object.price;
  }, 0);

  if (transactions.length === 0) {
    return (<></>);
  }

  if (isFetching) {
    return (
      <>
        <div className="mx-auto max-w-2xl mt-6 select-none">
          <div className="inline-flex items-center text-gray-800 select-none">
            <Spinner />
            <p>Obteniendo resultados</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AppearTransition show={true}>
        <table className="table-auto w-full mt-6">
          <thead>
            <tr className="text-left border-b border-slate-100">
              <th className="p-4">Fecha</th>
              <th>Tipo</th>
              <th>Concepto</th>
              <th>Recibo</th>
              <th>Costo</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(({ createdAt, type, concept, receiptId, price }, index) => (
              <tr key={index} className="text-gray-600 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                <td className="p-4">{new Date(createdAt!).toLocaleDateString()}</td>
                <td className="text-black">{type}</td>
                <td>{concept}</td>
                <td>{receiptId}</td>
                <td>{price.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
              </tr>
            ))}
            <tr className="text-gray-600 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
              <td className="p-4" colSpan={4}>&nbsp;</td>
              <td className="text-black font-bold">{total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex flex-row-reverse mt-6">
          <div
            className="px-4 py-3 text-gray-800 border border-gray-400 hover:bg-gray-100 cursor-pointer inline-flex items-center"
            onClick={handleCleanResults}
          >
            <XIcon className="w-5 h-5" />
            <span className="ml-2">Borrar resultados</span>
          </div>
        </div>
      </AppearTransition>
    </>
  );
}

export default ResultsAndTotal;
