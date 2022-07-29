import {
  FC,
  ReactElement,
  Fragment,
  useState,
  FormEvent,
} from 'react';

import { useRouter } from 'next/router';

import { Transition, Dialog } from '@headlessui/react';
import {
  XIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/outline';

import type { Subscription } from '@/types';
import Spinner from '@/components/Spinner';

interface SubscriptionModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  subscriberId: number;
  fetchSubscriber: () => void;
};

const NewSubscriptionModal: FC<SubscriptionModalProps> = ({ isModalOpen, closeModal, subscriberId, fetchSubscriber }): ReactElement => {
  const initialState: Subscription = {
    address: '',
    suburb: '',
    identifier: '',
    tvCount: 0,
    status: '',
    cfe: '',
    remarks: '',
    subscriberId,
  };

  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription>(initialState);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  function handleChange(event: FormEvent) {
    const target = event.target as HTMLInputElement;
    setSubscription({ ...subscription, [target.name]: target.value });
  }

  function handleReset(event: FormEvent) {
    event.preventDefault();
    setSubscription(initialState);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    /* POST request for contract creation */
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(subscription),
    };

    setIsFetching(true);
    fetch('/api/subscriptions', requestOptions)
      .then(response => response.json())
      .then(data => {
        fetchSubscriber();
        setIsFetching(false);

        handleReset(event);
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false)
        }, 3000);
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
              Contrato creado con &eacute;xito.
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
                    Nuevo contrato
                  </h3>

                  <div className="px-3 py-4 cursor-pointer border border-white hover:border-gray-400" onClick={closeModal} title="Cerrar ventana">
                    <XIcon className="w-5 h-5" />
                  </div>

                </Dialog.Title>
                <div className="mb-6">
                  <p className="text-sm text-gray-500">
                    Ingresa los datos del nuevo contrato. Los campos opcionales vienen indicados con una leyenda.
                  </p>

                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-field">
                    <label htmlFor="address" className="form-label">Domicilio</label>
                    <input
                      className="form-input"
                      type="text"
                      name="address"
                      value={subscription.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field mt-6">
                    <label htmlFor="suburb" className="form-label">Colonia</label>
                    <input
                      className="form-input"
                      type="text"
                      name="suburb"
                      value={subscription.suburb}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field mt-6">
                    <label htmlFor="identifier" className="form-label">Identificador <span className="text-gray-500">(Pendiente por defecto)</span></label>
                    <input
                      className="form-input"
                      type="text"
                      name="identifier"
                      value={subscription.identifier || 'Pendiente'}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field mt-6">
                    <label htmlFor="tvCount" className="form-label">N&uacute;mero de TV <span className="text-gray-500">(1 por defecto)</span></label>
                    <input
                      className="form-input"
                      type="number"
                      name="tvCount"
                      min="1"
                      value={subscription.tvCount}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field mt-6">
                    <label htmlFor="status" className="form-label">Estado <span className="text-gray-500">(Desconectado por defecto)</span></label>
                    <select
                      className="form-input"
                      name="status"
                      value={subscription.status}
                      onChange={handleChange}
                    >
                      <option value="Conectado">Conectado</option>
                      <option value="Desconectado" selected>Desconectado</option>
                      <option value="Suspendido">Suspendido</option>
                      <option value="Suspendido Temporal">Suspendido Temporal</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>

                  <div className="form-field mt-6">
                    <label htmlFor="cfe" className="form-label">N&uacute;mero de medidor <span className="text-gray-500">(Opcional)</span></label>
                    <input
                      className="form-input"
                      type="text"
                      name="cfe"
                      value={subscription.cfe}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field mt-6">
                    <label htmlFor="remarks" className="form-label">Observaciones <span className="text-gray-500">(Opcional)</span></label>
                    <input
                      className="form-input"
                      type="text"
                      name="remarks"
                      value={subscription.remarks}
                      onChange={handleChange}
                    />
                  </div>

                  <input type="hidden" name="subscriberId" value={subscriberId} />

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
                          <span className="ml-2">Creando contrato</span>
                        </button>
                      )
                      : (
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white inline-flex items-center"
                        >
                          <PlusIcon className="w-5 h-5" />
                          <span className="ml-2">Crear contrato</span>
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

export default NewSubscriptionModal;
