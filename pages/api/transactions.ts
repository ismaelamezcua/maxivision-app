import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';

import { Transaction } from '@/types';

const transactionsApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET' || req.method === 'PUT' || req.method === 'DELETE') {
    /* Method not supported for this API endpoint, use /api/search to retrieve subscribers */
    res.status(501).json({ status: 'Method not supported by the server and cannot be handled.' });
    return;
  } else if (req.method === 'POST') {
    /* Create a new contract */
    const { type, price, concept, receiptId, subscriptionId } = req.body as Transaction;

    const transaction = await prisma.transaction.create({
      data: {
        type,
        price: Number(price),
        concept,
        receiptId,
        subscriptionId: Number(subscriptionId),
      },
    });

    res.status(201).json(transaction);
    return;
  }
};

export default transactionsApiHandler;
 