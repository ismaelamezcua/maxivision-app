import { FC, ReactElement } from 'react';
import { Subscriber } from '@/types';
import { XIcon } from '@heroicons/react/outline';
import Spinner from '@/components/Spinner';
import AppearTransition from '../AppearTransition';
import Link from 'next/link';

interface TableProps {
  subscribers: Subscriber[];
  isFetching: boolean;
  handleCleanResults: () => void;
}

const ResultsTable: FC<TableProps> = (props): ReactElement => {
  const { subscribers, isFetching, handleCleanResults } = props;

  if (subscribers.length === 0) {
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
              <th className="p-4">Nombre</th>
              <th>Correo electr&oacute;nico</th>
              <th>Tel&eacute;fono</th>
              <th>RFC</th>
              <th>C&oacute;nyugue</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map(({ id, name, email, phone, rfc, spouse }, index) => (
              <Link key={index} href={`/subscribers/${id}`}>
                <tr className="text-gray-600 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <td className="p-4 text-black">{name}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>{rfc}</td>
                  <td>{spouse}</td>
                </tr>
              </Link>
            ))}
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

export default ResultsTable;
