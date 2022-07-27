import {
  FC,
  ReactElement,
  Fragment,
  useState,
  FormEvent,
} from 'react';

import Router from 'next/router';

import { Transition, Dialog } from '@headlessui/react';
import {
  XIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/outline';

import type { ServiceReport } from '@/types';
import Spinner from '@/components/Spinner';

interface ServiceReportModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  subscriptionId: number;
};

const NewServiceReportModal: FC<ServiceReportModalProps> = ({ isModalOpen, closeModal, subscriptionId }): ReactElement => {
  const initialState: ServiceReport = {
    description: '',
    status: 'En progreso',
    comments: '',
    subscriptionId,
  };

  const [serviceReport, setServiceReport] = useState<ServiceReport>(initialState);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  function handleChange(event: FormEvent) {
    const target = event.target as HTMLInputElement;
    setServiceReport({ ...serviceReport!, [target.name]: target.value });
  }

  function handleReset(event: FormEvent) {
    event.preventDefault();
    setServiceReport(initialState);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    /* POST request for transaction creation */
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(serviceReport),
    };

    setIsFetching(true);
    fetch('/api/service-reports', requestOptions)
      .then(response => response.json())
      .then(data => {
        setIsFetching(false);

        /* Clean the form */
        handleReset(event);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false)
          closeModal();
          Router.reload();
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
              Reporte generado con &eacute;xito.
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
                    Nuevo reporte de servicio
                  </h3>

                  <div className="px-3 py-4 cursor-pointer border border-white hover:border-gray-400" onClick={closeModal} title="Cerrar ventana">
                    <XIcon className="w-5 h-5" />
                  </div>

                </Dialog.Title>
                <div className="mb-6">
                  <p className="text-sm text-gray-500">
                    Ingresa los datos del reporte de servicio. Los campos opcionales vienen indicados con una leyenda.
                  </p>

                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-field">
                    <label htmlFor="description" className="form-label">Descripci&oacute;n</label>
                    <input
                      className="form-input"
                      type="text"
                      name="description"
                      value={serviceReport.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field mt-6">
                    <label htmlFor="status" className="form-label">Estado</label>
                    <select
                      className="form-input"
                      name="status"
                      value={serviceReport.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="Completado">Completado</option>
                      <option value="En progreso">En progreso</option>
                      <option value="En espera">En espera</option>
                    </select>
                  </div>

                  <div className="form-field mt-6">
                    <label htmlFor="comments" className="form-label">Comentarios</label>
                    <input
                      className="form-input"
                      type="text"
                      name="comments"
                      value={serviceReport.comments}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <input type="hidden" name="subscriptionId" value={subscriptionId} />

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
                          <span className="ml-2">Generando reporte</span>
                        </button>
                      )
                      : (
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white inline-flex items-center"
                        >
                          <PlusIcon className="w-5 h-5" />
                          <span className="ml-2">Generar reporte</span>
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

export default NewServiceReportModal;
