import type { NextApiRequest, NextApiResponse } from "next";
import type { Subscriber, ResponseError } from '../../types';
import prisma from '../../lib/prisma';

const subscriberApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET' || req.method === 'PUT' || req.method === 'DELETE') {
    /* Method not supported for this API endpoint, use /api/search to retrieve subscribers */
    res.status(501).json({ status: 'Method not supported by the server and cannot be handled.' });
    return;
  } else if (req.method === 'POST') {
    /* Create a new subscriber */
    const { name, email, phone, rfc, spouse } = req.body;

    const subscriber = await prisma.subscriber.create({
      data: {
        name,
        email,
        phone,
        rfc,
        spouse,
      },
    });

    res.status(201).json(subscriber);
    return;
  }
};

export default subscriberApiHandler;
