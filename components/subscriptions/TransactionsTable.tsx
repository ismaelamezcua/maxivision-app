import { FC, ReactElement } from 'react';

import { Transaction } from '@/types';
import AppearTransition from '@/components/AppearTransition';
import Link from 'next/link';
import { PrinterIcon } from '@heroicons/react/outline';

const TransactionsTable: FC<{ transactions: Transaction[] }> = ({ transactions }): ReactElement => {
  return (
    <>
      <AppearTransition show={true}>
        <table className="table-auto w-full mt-6">
          <thead>
            <tr className="text-left border-b border-slate-100">
              <th className="p-4">Fecha</th>
              <th>Tipo</th>
              <th>Costo</th>
              <th>Concepto</th>
              <th>Recibo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(({ id, createdAt, type, price, concept, receiptId }, index) => (
              <tr key={index} className="text-gray-600 border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">{new Date(createdAt!).toLocaleDateString()}</td>
                <td className="text-black">{type}</td>
                <td>{price}</td>
                <td>{concept}</td>
                <td>{receiptId}</td>
                <td>
                  <Link href={`/transactions/${id}`}>
                    <a>
                      <PrinterIcon className="w-5 h-5" />
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AppearTransition>
    </>
  );
}

export default TransactionsTable;
