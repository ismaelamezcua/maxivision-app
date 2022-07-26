import { FC, ReactElement } from 'react';

import Link from 'next/link';

import { Subscription } from '@/types';
import AppearTransition from '@/components/AppearTransition';

const SubscriptionsTable: FC<{ subscriptions: Subscription[] }> = ({ subscriptions }): ReactElement => {
  function formatDate(date: string) {
    const formattedDate = new Date(date);

    return (<span>{formattedDate.toLocaleDateString()}</span>);
  }
  return (
    <>
      <AppearTransition show={true}>
        <table className="table-auto w-full mt-6">
          <thead>
            <tr className="text-left border-b border-slate-100">
              <th className="p-4">No.</th>
              <th>Creaci&oacute;n</th>
              <th>Direcci&oacute;n</th>
              <th>Colonia</th>
              <th>No. TV</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(({ id, createdAt, address, suburb, tvCount, status }, index) => (
              <Link key={index} href={`/subscriptions/${id}`}>
                <tr className="text-gray-600 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <td className="p-4">{index}</td>
                  <td>{formatDate(createdAt as string)}</td>
                  <td className="text-black">{address}</td>
                  <td>{suburb}</td>
                  <td>{tvCount}</td>
                  <td>{status}</td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </AppearTransition>
    </>
  );
}

export default SubscriptionsTable;
