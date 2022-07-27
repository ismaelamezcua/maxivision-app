import {
  FC,
  ReactElement,
  Fragment,
  useState,
} from 'react';

import { Transition, Dialog } from '@headlessui/react';
import {
  XIcon,
  TrashIcon,
  UserAddIcon,
} from '@heroicons/react/outline';

import type { Subscriber } from '@/types';
import Spinner from '@/components/Spinner';

interface SubscriberModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
};

const NewSubscriberModal: FC<SubscriberModalProps> = ({ isModalOpen, closeModal }): ReactElement => {
  const initialState: Subscriber = {
    name: '',
    email: '',
    phone: '',
    rfc: '',
    spouse: '',
  };

  const [subscriberInfo, setSubscriberInfo] = useState<Subscriber>(initialState);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  function handleChange(event) {
    setSubscriberInfo({ ...subscriberInfo, [event.target.name]: event.target.value });
  }

  function handleReset(event) {
    event.preventDefault();
    setSubscriberInfo(initialState);
  }

  function handleSubmit(event) {
    event.preventDefault();
    /* POST request for subscriber creation */
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(subscriberInfo),
    };

    setIsFetching(true);
    fetch('/api/subscribers', requestOptions)
      .then(response => response.json())
      .then(data => {
        setIsFetching(false);

        /* Clean the form */
        handleReset(event);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      });
  }

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <Transition
            show={showAlert}
            enter="transition-opacity duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute left-0 right-0 font-bold text-green-800 px-4 py-3 bg-green-200 text-center">
              Usuario registrado con &eacute;xito.
            </div>
          </Transition>

          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden border-t-2 border-blue-600 bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="flex flex-row justify-between items-center"
                >
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Nuevo suscriptor
                  </h3>

                  <div className="px-3 py-4 cursor-pointer border border-white hover:border-gray-400" onClick={closeModal} title="Cerrar ventana">
                    <XIcon className="w-5 h-5" />
                  </div>

                </Dialog.Title>
                <div className="mb-6">
                  <p className="text-sm text-gray-500">
                    Ingresa los datos del nuevo suscriptor. Los campos opcionales vienen indicados con una leyenda.
                  </p>

                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-field">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input
                      className="form-input"
                      type="text"
                      name="name"
                      value={subscriberInfo.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field mt-6">
                    <label htmlFor="email" className="form-label">Correo electr&oacute;nico</label>
                    <input
                      className="form-input"
                      type="email"
                      name="email"
                      value={subscriberInfo.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field mt-6">
                    <label htmlFor="phone" className="form-label">Tel&eacute;fono</label>
                    <input
                      className="form-input"
                      type="text"
                      name="phone"
                      value={subscriberInfo.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field mt-6">
                    <label htmlFor="rfc" className="form-label">RFC <span className="text-gray-500">(Opcional)</span></label>
                    <input
                      className="form-input"
                      type="text"
                      name="rfc"
                      value={subscriberInfo.rfc}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field mt-6">
                    <label htmlFor="spouse" className="form-label">C&oacute;nyugue <span className="text-gray-500">(Opcional)</span></label>
                    <input
                      className="form-input"
                      type="text"
                      name="spouse"
                      value={subscriberInfo.spouse}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-row mt-6 max-w-xl mx-auto space-x-6 justify-end">
                    <button
                      type="reset"
                      onClick={handleReset}
                      className="border border-gray-400 hover:bg-gray-100 px-4 py-3 text-gray-800 inline-flex items-center">
                      <TrashIcon className="w-5 h-5" />
                      <span className="ml-2">Limpiar formulario</span>
                    </button>

                    {isFetching
                      ? (
                        <button
                          disabled={true}
                          type="submit"
                          className="bg-gray-200 px-4 py-3 text-gray-400 inline-flex items-center"
                        >
                          <Spinner />
                          <span className="ml-2">Creando usuario</span>
                        </button>
                      )
                      : (
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white inline-flex items-center"
                        >
                          <UserAddIcon className="w-5 h-5" />
                          <span className="ml-2">Crear usuario</span>
                        </button>
                      )}
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default NewSubscriberModal;
