import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

async function searchSubscriptionsApiHandler(req: NextApiRequest, res: NextApiResponse) {
  if (
    req.method === 'GET'
    || req.method === 'PUT'
    || req.method === 'DELETE'
  ) {
    /* Method not supported for this API endpoint */
    res.status(501).json({ status: 'Method not supported by the server and cannot be handled.' });

    return;
  } else if (req.method === 'POST') {
    const { subscriberId } = req.body;

    const subscriptions = await prisma.subscription.findMany({
      where: {
        subscriberId: parseInt(subscriberId as string),
      },
    });

    res.status(200).json(subscriptions);

    return;
  }
}

export default searchSubscriptionsApiHandler;
