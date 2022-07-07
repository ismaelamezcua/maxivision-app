import type { FC, ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ClipboardListIcon, CreditCardIcon, ExclamationIcon, PencilAltIcon, UsersIcon } from '@heroicons/react/outline';

const Navbar: FC = (): ReactElement => {
  const router = useRouter();

  const menuEntries = [
    { key: 'subscribers', label: 'Suscriptores', href: '/', icon: <UsersIcon className="w-6 h-6" /> },
    { key: 'contracts', label: 'Contratos', href: '/contratos', icon: <PencilAltIcon className="w-6 h-6" /> },
    { key: 'transactions', label: 'Movimientos', href: '/movimientos', icon: <CreditCardIcon className="w-6 h-6" /> },
    { key: 'reports', label: 'Reportes', href: '/reportes-servicio', icon: <ExclamationIcon className="w-6 h-6" /> },
    { key: 'sales', label: 'Reporte de movimientos', href: '/reporte-movimientos', icon: <ClipboardListIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="w-full bg-blue-100 border-b border-blue-200">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-end">
          <img
            className="max-h-24 p-4"
            src="/maxivision-logo.png"
            alt="Maxivision"
          />
          <div className="flex flewx-row space-x-4">
            {menuEntries.map(({ key, label, href, icon }) => (
              <Link key={key} href={href}>
                <a>
                  <div className={`text-blue-900 w-full p-2 rounded-t-lg inline-flex ${(router.asPath === href) ? 'bg-blue-200' : 'hover:bg-blue-200'} `}>
                    {icon}
                    <span className="ml-1">{label}</span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
