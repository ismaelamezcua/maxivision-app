import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma';
import { Transaction } from "@/types";

const transactionApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    /* Return transaction with [id] */
    const { id } = req.query;

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });

    transaction !== null
      ? res.status(200).json(transaction)
      : res.status(404).json({ status: `Transaction with id ${id} not found.` });

    return;
  } else if (req.method === 'POST') {
    /* Method not supported for this API endpoint, use /api/transactions to create new transactions */
    res.status(501).json({ status: 'Method not supported by the server and cannot be handled.' });

    return;
  } else if (req.method === 'PUT') {
    /* Update details for transaction [id] if it exists */
    const { id } = req.query;

    const { type, price, concept, receiptId, subscriptionId } = req.body as Transaction;

    const transaction = await prisma.transaction.update({
      where: {
        id: parseInt(id as string)
      },
      data: {
        type,
        price,
        concept,
        receiptId,
        subscriptionId,
      },
    });

    transaction !== null
      ? res.status(200).json(transaction)
      : res.status(409).json({ status: 'Could not update the suscription.' });

    return;
  } else if (req.method === 'DELETE') {
    /* Remove transaction [id] */
    const { id } = req.query;

    const transactions = await prisma.transaction.delete({
      where: {
        id: parseInt(id as string)
      }
    });

    res.status(204).json({ status: `Transaction with id ${id} deleted.` });

    return;
  }
};

export default transactionApiHandler;
