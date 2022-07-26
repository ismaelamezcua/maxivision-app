import { FC, useEffect, useState } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { ChevronLeftIcon, PencilAltIcon, SaveIcon } from '@heroicons/react/outline';

import { Subscription, Transaction, ServiceReport } from '@/types';
import Spinner from '@/components/Spinner';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: () => void;
}

const InputField: FC<InputFieldProps> = (props) => {
  const {
    label,
    type,
    name,
    value,
    disabled,
    required,
    onChange,
  } = props;

  return (
    <div className="flex space-x-8 w-full items-center mb-6">
      <div className="basis-1/4 text-right">{label}</div>
      <div className="flex-grow">
        <input
          className="form-input"
          type={type}
          name={name}
          value={value}
          disabled={disabled}
          required={required}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

const SubscriptionDetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [subscription, setSubscription] = useState<Subscription>();
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [serviceReports, setServiceReports] = useState<ServiceReport[]>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsFetching(true);

    fetch(`/api/subscriptions/${id}`)
      .then(response => response.json())
      .then(data => {
        setSubscription(data as Subscription);
        setTransactions(data.transactions as Transaction[]);
        setServiceReports(data.serviceReports as ServiceReport[]);
        setIsFetching(false);
      });
  }, []);

  function handleChange(event) {
    setSubscription({ ...subscription!, [event.target.name]: event.target.value });
  }

  return (
    <>
      <Head>
        <title>Maxivision - Detalles de contrato</title>
      </Head>
      <div className="container mx-auto max-w-6xl my-6">
        <div className="flex flex-col space-y-6">

          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-slate-600">Detalles de contrato</h1>

            <div
              className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white inline-flex items-center cursor-pointer"
              onClick={router.back}
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <span className="ml-2">Regresar</span>
            </div>
          </div>
        </div>

      </div>

      <div className="container mx-auto max-w-6xl my-6">
        <div className="bg-white p-6">
          {isFetching && (
            <>
              <div className="inline-flex mx-auto">
                <Spinner />
                <p>Obteniendo datos...</p>
              </div>
            </>

          )}

          {subscription !== undefined && (
            <>
              <InputField
                label="Fecha de creación"
                type="text"
                name="createdAt"
                value={new Date(subscription.createdAt!).toLocaleDateString()}
                disabled
              />
              <InputField
                label="Última modificación"
                type="text"
                name="updatedAt"
                value={new Date(subscription.updatedAt!).toLocaleDateString()}
                disabled
              />
              <InputField
                label="Dirección"
                type="text"
                name="address"
                value={subscription.address}
                disabled={isDisabled}
                onChange={handleChange}
                required
              />
              <InputField
                label="Colonia"
                type="text"
                name="suburb"
                value={subscription.suburb}
                disabled={isDisabled}
                onChange={handleChange}
                required
              />
              <InputField
                label="Identificador"
                type="text"
                name="identifier"
                value={subscription.identifier}
                disabled={isDisabled}
                onChange={handleChange}
                required
              />
              <InputField
                label="Número de televisiones"
                type="number"
                name="tvCount"
                value={subscription.tvCount.toString()}
                disabled={isDisabled}
                onChange={handleChange}
                required
              />
              <InputField
                label="Estado del servicio"
                type="text"
                name="status"
                value={subscription.status}
                disabled={isDisabled}
                onChange={handleChange}
                required
              />

              <div className="flex space-x-8 w-full items-center mb-6">
                <div className="basis-1/4 text-right">Estado del servicio</div>
                <div className="flex-grow">
                  <select
                    className="form-input"
                    name="status"
                    value={subscription.status}
                    disabled={isDisabled}
                    onChange={handleChange}
                  >
                    <option value="Conectado">Conectado</option>
                    <option value="Desconectado">Desconectado</option>
                    <option value="Suspendido">Suspendido</option>
                    <option value="Suspendido Temporal">Suspendido Temporal</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>

              <InputField
                label="Número de medidor"
                type="text"
                name="cfe"
                value={subscription.cfe!}
                disabled={isDisabled}
                onChange={handleChange}
                required
              />
              <InputField
                label="Observaciones"
                type="text"
                name="remarks"
                value={subscription.remarks!}
                disabled={isDisabled}
                onChange={handleChange}
                required
              />
              <div className="flex flex-row mt-6 justify-end">
                {isDisabled
                  ? (
                    <div
                      className="px-4 py-3 text-gray-800 border border-gray-400 hover:bg-gray-100 cursor-pointer inline-flex items-center"
                      onClick={() => setIsDisabled(!isDisabled)}
                    >
                      <PencilAltIcon className="w-5 h-5" />
                      <span className="ml-2">Editar suscriptor</span>
                    </div>
                  )
                  : isFetching
                    ? (
                      <button
                        disabled={true}
                        type="submit"
                        className="bg-gray-200 px-4 py-3 text-gray-400 inline-flex items-center"
                      >
                        <Spinner />
                        <span className="ml-2">Guardando cambios</span>
                      </button>

                    )
                    : (
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white inline-flex items-center"
                      >
                        <SaveIcon className="w-5 h-5" />
                        <span className="ml-2">Guardar cambios</span>
                      </button>
                    )
                }
              </div>
            </>
          )}

          {transactions != undefined && (
            <h1 className="font-black">Transactions</h1>
          )}

          {serviceReports != undefined && (
            <h1 className="text-2xl">Reportes de servicio</h1>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default SubscriptionDetails;
