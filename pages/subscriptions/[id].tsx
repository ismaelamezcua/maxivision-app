import { useEffect, useState } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { ChevronLeftIcon } from '@heroicons/react/outline';

import { Subscription } from '@/types';
import Spinner from '@/components/Spinner';

const SubscriptionDetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [subscription, setSubscription] = useState<Subscription>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setIsFetching(true);

    fetch(`/api/subscriptions/${id}`)
      .then(response => response.json())
      .then(data => {
        setSubscription(data as Subscription);
        setIsFetching(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Maxivision - Detalles de contrato</title>
      </Head>
      <div className="container mx-auto max-w-6xl mt-6">
        <div className="flex flex-col space-y-6">

          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">Detalles de contrato</h1>

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

      <div className="container mx-auto max-w-6xl mt-6">
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
              <div className="flex space-x-4 w-full items-center mb-6">
                <div className="basis-1/4">Direcci&oacute;n</div>
                <div className="flex-grow">
                  <input
                    className="form-input"
                    type="text"
                    name="address"
                    value={subscription.address}
                    disabled
                    required
                  />
                </div>
              </div>
            </>
          )}
          Detalles
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
