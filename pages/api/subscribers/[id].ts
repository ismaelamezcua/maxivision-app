import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma';
import { Subscriber } from "@/types";

const subscriberApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    /* Return subscriber with [id] */
    const { id } = req.query;

    const subscriber = await prisma.subscriber.findUnique({
      where: {
        id: parseInt(id as string),
      }
    });

    subscriber !== null
      ? res.status(200).json(subscriber)
      : res.status(404).json({ status: `Subscriber with id ${id} not found.` });

    return;
  } else if (req.method === 'POST') {
    /* Method not supported for this API endpoint, use /api/subscribers to create new subscribers */
    res.status(501).json({ status: 'Method not supported by the server and cannot be handled.' });

    return;
  } else if (req.method === 'PUT') {
    /* Update details for subscriber [id] if it exists */
    const { id } = req.query;
    const { name, email, phone, rfc, spouse } = req.body as Subscriber;

    const subscriber = await prisma.subscriber.update({
      where: {
        id: parseInt(id as string)
      },
      data: {
        name,
        email,
        phone,
        rfc,
        spouse,
      }
    });

    subscriber !== null
      ? res.status(200).json(subscriber)
      : res.status(409).json({ status: 'Could not update the subscriber.' });

    return;
  } else if (req.method === 'DELETE') {
    /* Remove subscriber [id] */
    const { id } = req.query;

    const subscriber = await prisma.subscriber.delete({
      where: {
        id: parseInt(id as string)
      }
    });

    res.status(204).json({ status: `Subscriber with id ${id} deleted.` });

    return;
  }
};

export default subscriberApiHandler;
