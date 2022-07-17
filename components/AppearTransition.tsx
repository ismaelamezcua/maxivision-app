import { FC, ReactElement, ReactNode } from 'react';
import { Transition } from '@headlessui/react';

const AppearTransition: FC<{ children: ReactNode, show: boolean }> = (props): ReactElement => {
  const { children, show } = props;

  return (
    <Transition
      show={show}
      enter="transition-opacity ease-linear duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-50"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
};

export default AppearTransition;
