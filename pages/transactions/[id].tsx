import { useCallback, useEffect, useState } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { PrinterIcon } from '@heroicons/react/outline';

import { Subscriber, Subscription, Transaction } from '@/types';

const TransactionsDetails: NextPage = () => {
  const [subscriber, setSubscriber] = useState<Subscriber>();
  const [subscription, setSubscription] = useState<Subscription>();
  const [transaction, setTransaction] = useState<Transaction>();
  const { id } = useRouter().query;

  let fetchData = useCallback(async () => {
    let transactionResponse = await fetch(`/api/transactions/${id}`);
    const transactionData = await transactionResponse.json();
    setTransaction(transactionData as Transaction);

    const subscriptionResponse = await fetch(`/api/subscriptions/${transactionData.subscriptionId}`);
    const subscriptionData = await subscriptionResponse.json();
    setSubscription(subscriptionData as Subscription);

    const subscriberResponse = await fetch(`/api/subscribers/${subscriptionData.subscriberId}`);
    const subscriberData = await subscriberResponse.json();
    setSubscriber(subscriberData as Subscriber);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let navbar = document.querySelector('#navbar');
    navbar?.remove();

    fetchData();
  }, [fetchData]);

  return (
    <>
      <h1 className="font-bold">{subscriber?.name}</h1>

      <div className="flex justify-end print:hidden">
        <div
          className="mx-6 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center space-x-2 cursor-pointer"
          onClick={() => window.print()}
        >
          <PrinterIcon className="w-5 h-5" />
          <span>Imprimir</span>
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

export default TransactionsDetails;
