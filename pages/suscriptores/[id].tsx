import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Subscriber } from '@/types';
import { ChevronLeftIcon } from '@heroicons/react/outline';

const SubscriberDetails: NextPage = () => {
  const [subscriber, setSubscriber] = useState<Subscriber>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetch(`/api/subscribers/${id}`)
      .then(response => response.json())
      .then(subscriber => {
        console.log('====================================')
        console.log({ subscriber })
        setSubscriber(subscriber);
        setIsLoading(false);
      });
  }, []);

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
            {isLoading
              ? <h1>Is Loading</h1>
              : <p>Nombre: Hola {subscriber.name}</p>
            }
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
