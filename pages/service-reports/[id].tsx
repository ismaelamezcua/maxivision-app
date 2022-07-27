import { FC, FormEvent, useEffect, useState } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { ChevronLeftIcon, PencilAltIcon, SaveIcon } from '@heroicons/react/outline';

import { ServiceReport } from '@/types';
import Spinner from '@/components/Spinner';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (event: FormEvent<Element>) => void;
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

const ServiceReportDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [serviceReport, setServiceReport] = useState<ServiceReport>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsFetching(true);

    fetch(`/api/service-reports/${id}`)
      .then(response => response.json())
      .then(data => {
        setServiceReport(data as ServiceReport);
        setIsFetching(false);
      });
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsFetching(true);

    fetch(`/api/service-reports/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceReport),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(updatedServiceReport => {
        // TODO: Show alert on updated subscription 
        setServiceReport(updatedServiceReport);
        setIsDisabled(true);
        setIsFetching(false);
      });
  }

  function handleChange(event: FormEvent) {
    const target = event.target as HTMLInputElement;
    setServiceReport({ ...serviceReport!, [target.name]: target.value });
  }

  return (
    <>
      <Head>
        <title>Maxivision - Detalles de reporte de servicio</title>
      </Head>
      <div className="container mx-auto max-w-6xl my-6">
        <div className="flex flex-col space-y-6">

          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-slate-600">Detalles de reporte de servicio</h1>

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

      <div className="container mx-auto max-w-6xl mt-6 mb-12 shadow-md">
        <div className="bg-white p-6">
          {isFetching && (
            <>
              <div className="inline-flex mx-auto">
                <Spinner />
                <p>Obteniendo datos...</p>
              </div>
            </>

          )}

          {serviceReport !== undefined && (
            <>
              <form onSubmit={handleSubmit}>
                <InputField
                  label="Fecha de creación"
                  type="text"
                  name="createdAt"
                  value={new Date(serviceReport.createdAt!).toLocaleDateString()}
                  disabled
                />
                <InputField
                  label="Última modificación"
                  type="text"
                  name="updatedAt"
                  value={new Date(serviceReport.updatedAt!).toLocaleDateString()}
                  disabled
                />
                <InputField
                  label="Descripción"
                  type="text"
                  name="description"
                  value={serviceReport.description}
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
                      value={serviceReport.status}
                      disabled={isDisabled}
                      onChange={handleChange}
                      required
                    >
                      <option value="Completado">Completado</option>
                      <option value="En progreso">En progreso</option>
                      <option value="En espera">En espera</option>
                    </select>
                  </div>
                </div>

                <InputField
                  label="Comentarios"
                  type="text"
                  name="comments"
                  value={serviceReport.comments}
                  disabled={isDisabled}
                  onChange={handleChange}
                />

                <div className="flex flex-row mt-6 justify-end">
                  {isDisabled
                    ? (
                      <div
                        className="px-4 py-3 text-gray-800 border border-gray-400 hover:bg-gray-100 cursor-pointer inline-flex items-center"
                        onClick={() => setIsDisabled(!isDisabled)}
                      >
                        <PencilAltIcon className="w-5 h-5" />
                        <span className="ml-2">Editar reporte</span>
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
              </form>
            </>
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

export default ServiceReportDetail;
