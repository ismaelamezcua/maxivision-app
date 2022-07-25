import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, ReactElement, useEffect, useState, VoidFunctionComponent } from 'react';
import { Subscriber, Subscription } from '@/types';
import NewSubscriptionModal from '@/components/subscriptions/NewSubscriptionModal';
import Spinner from '@/components/Spinner';
import { ChevronLeftIcon, PencilAltIcon, PlusIcon, SaveIcon } from '@heroicons/react/outline';

interface DetailsInputProps {
  label: string;
  name: string;
  value: string;
  disabled: boolean;
  optional: boolean;
  onChange: () => void;
};

const DetailsInput: FC<DetailsInputProps> = (props): ReactElement => {
  const { label, name, value, disabled, optional, onChange } = props;

  return (
    <div className="flex space-x-4 w-full items-center mb-6">
      <div className="basis-1/4">{label}</div>
      <div className="flex-grow">
        <input
          className="form-input"
          type={name === 'email' ? 'email' : 'text'}
          name={name}
          value={value}
          onChange={onChange}
          disabled={!disabled}
          required={!optional}
        />
      </div>
    </div>
  );
};

const SubscriberDetails: NextPage = () => {
  const [subscriber, setSubscriber] = useState<Subscriber>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newContractModal, setNewContratModal] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetch(`/api/subscribers/${id}`)
      .then(response => response.json())
      .then(subscriber => {
        setSubscriber(subscriber);
        setIsLoading(false);
      });
  }, []);

  function handleChange(event) {
    setSubscriber({ ...subscriber, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsFetching(true);

    fetch(`/api/subscribers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(subscriber),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(updatedSuscriber => {
        // TODO: Show alert on updated subscriber
        setSubscriber(updatedSuscriber);
        setEditMode(false);
        setIsFetching(false);
      });
  }

  return (
    <>
      <Head>
        <title>Maxivision - Detalles de suscriptor</title>
      </Head>
      <div className="container mx-auto max-w-6xl mt-6">
        <div className="flex flex-col space-y-6">

          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">Detalles de suscriptor</h1>

            <div
              className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white inline-flex items-center cursor-pointer"
              onClick={() => router.back()}
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <span className="ml-2">Regresar</span>
            </div>
          </div>

          <div className="bg-white p-6">
            {isLoading && (
              <h1 className="font-bold">Loading data...</h1>
            )}
            {subscriber && (
              <>
                <form onSubmit={handleSubmit}>
                  <DetailsInput label="Nombre" name="name" value={subscriber.name} disabled={editMode} onChange={handleChange} />
                  <DetailsInput label="Correo electrónico" name="email" value={subscriber.email} disabled={editMode} onChange={handleChange} />
                  <DetailsInput label="Teléfono" name="phone" value={subscriber.phone} disabled={editMode} onChange={handleChange} />
                  <DetailsInput label="RFC" name="rfc" value={subscriber.rfc} disabled={editMode} onChange={handleChange} optional />
                  <DetailsInput label="Cónyugue" name="spouse" value={subscriber.spouse} disabled={editMode} onChange={handleChange} optional />

                  <div className="flex flex-row mt-6 justify-end">
                    {!editMode
                      ? (
                        <div
                          className="px-4 py-3 text-gray-800 border border-gray-400 hover:bg-gray-100 cursor-pointer inline-flex items-center"
                          onClick={() => setEditMode(true)}
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

                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <hr className="mt-6 max-w-6xl mx-auto border-2 border-gray-300" />

      <NewSubscriptionModal isModalOpen={newContractModal} closeModal={() => setNewContratModal(false)} subscriberId={parseInt(id as string)} />

      <div className="container mx-auto max-w-6xl mt-6">
        <div className="flex flex-col space-y-6">

          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">Contratos</h1>

            <div
              className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white inline-flex items-center cursor-pointer"
              onClick={() => setNewContratModal(true)}
            >
              <PlusIcon className="w-5 h-5" />
              <span className="ml-2">Agregar contratro</span>
            </div>
          </div>

          <div className="bg-white p-6">
            Contratos
          </div>
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

export default SubscriberDetails;
