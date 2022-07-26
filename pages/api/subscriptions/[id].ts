import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma';
import { Subscriber, Subscription } from "@/types";

const subscriptionApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    /* Return subscriber with [id] */
    const { id } = req.query;

    const subscription = await prisma.subscription.findUnique({
      where: {
        id: parseInt(id as string),
      },
      include: {
        transactions: true,
        serviceReports: true,
      }
    });

    subscription !== null
      ? res.status(200).json(subscription)
      : res.status(404).json({ status: `Suscription with id ${id} not found.` });

    return;
  } else if (req.method === 'POST') {
    /* Method not supported for this API endpoint, use /api/subscribers to create new subscribers */
    res.status(501).json({ status: 'Method not supported by the server and cannot be handled.' });

    return;
  } else if (req.method === 'PUT') {
    /* Update details for subscriber [id] if it exists */
    const { id } = req.query;

    const { address, suburb, identifier, tvCount, status, cfe, remarks, subscriberId } = req.body as Subscription;

    const suscription = await prisma.subscription.update({
      where: {
        id: parseInt(id as string)
      },
      data: {
        address,
        suburb,
        identifier,
        tvCount: Number(tvCount),
        status,
        cfe,
        remarks,
        subscriberId,
      }
    });

    suscription !== null
      ? res.status(200).json(suscription)
      : res.status(409).json({ status: 'Could not update the suscription.' });

    return;
  } else if (req.method === 'DELETE') {
    /* Remove subscriber [id] */
    const { id } = req.query;

    const suscription = await prisma.subscription.delete({
      where: {
        id: parseInt(id as string)
      }
    });

    res.status(204).json({ status: `Suscription with id ${id} deleted.` });

    return;
  }
};

export default subscriptionApiHandler;
