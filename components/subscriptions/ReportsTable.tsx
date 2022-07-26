import { FC, ReactElement } from 'react';

import { ServiceReport } from '@/types';
import AppearTransition from '@/components/AppearTransition';

const ReportsTable: FC<{ reports: ServiceReport[] }> = ({ reports }): ReactElement => {
  return (
    <>
      <AppearTransition show={true}>
        <table className="table-auto w-full mt-6">
          <thead>
            <tr className="text-left border-b border-slate-100">
              <th className="p-4">Fecha</th>
              <th>Descripci&oacute;n</th>
              <th>Estado</th>
              <th>Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(({ id, createdAt, description, status, comments }, index) => (
              <tr key={index} className="text-gray-600 border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">{new Date(createdAt!).toLocaleDateString()}</td>
                <td className="text-black">{description}</td>
                <td>{status}</td>
                <td>{comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AppearTransition>
    </>
  );
}

export default ReportsTable;
