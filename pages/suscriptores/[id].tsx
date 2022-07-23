import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Subscriber } from '@/types';
import { ChevronLeftIcon, PencilAltIcon, SaveIcon } from '@heroicons/react/outline';

const SubscriberDetails: NextPage = () => {
  const [subscriber, setSubscriber] = useState<Subscriber>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nameDisabled, setNameDisabled] = useState<boolean>(true);
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
            {subscriber && (
              <div className="flex space-x-2 max-w-3xl mx-auto items-center">
                <div className="basis-1/4">
                  <p className="font-bold text-gray-600">Nombre</p>
                </div>
                <div className="flex-grow">
                  <input
                    className={`${!nameDisabled && 'bg-blue-100'} form-input`}
                    type="text"
                    name="name"
                    value={subscriber.name}
                    onChange={handleChange}
                    disabled={nameDisabled}
                    required
                  />
                </div>
                <div
                  className="px-2 py-3 hover:bg-gray-100 border border-white hover:border-gray-400 cursor-pointer"
                  onClick={() => setNameDisabled(!nameDisabled)}
                >
                  {nameDisabled
                    ? <PencilAltIcon className="w-6 h-6" />
                    : <SaveIcon className="w-6 h-6" />
                  }
                </div>
              </div>
            )}
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
