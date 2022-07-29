import type { FC, ReactElement } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { CreditCardIcon, UsersIcon } from '@heroicons/react/outline';

const Navbar: FC = (): ReactElement => {
  const router = useRouter();

  const menuEntries = [
    {
      label: 'Suscriptores',
      href: '/subscribers',
      description: 'Busca y agrega suscriptores',
      icon: <UsersIcon className="w-6 h-6" />
    },
    {
      label: 'Movimientos',
      href: '/transactions',
      description: 'Revisa las ventas diarias',
      icon: <CreditCardIcon className="w-6 h-6" />
    },
  ];

  return (
    <div className="w-full bg-white" id="navbar">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-row justify-between items-end">
          <img
            className="max-h-24 p-4"
            src="/maxivision-logo.png"
            alt="Maxivision"
          />
          <div className="flex flewx-row space-x-4">
            {menuEntries.map(({ label, href, description, icon }, index) => (
              <Link key={index} href={href}>
                <a>
                  <div className={`w-full p-2 inline-flex ${(router.asPath.includes(href)) ? 'border-b-2 border-blue-600 font-semibold' : 'hover:border-b-2'} `}>
                    {icon}
                    <span className="ml-1" title={description}>{label}</span>
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
