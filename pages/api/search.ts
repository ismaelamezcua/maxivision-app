import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

async function searchApiHandler(req: NextApiRequest, res: NextApiResponse) {
  if (
    req.method === 'GET'
    || req.method === 'PUT'
    || req.method === 'DELETE'
  ) {
    /* Method not supported for this API endpoint, use /api/search to retrieve subscribers */
    res.status(501).json({ status: 'Method not supported by the server and cannot be handled.' });

    return;
  } else if (req.method === 'POST') {
    const { term } = req.body;

    const byAddress = await prisma.subscription.findMany({
      select: {
        subscriberId: true,
      },
      where: {
        address: {
          contains: term as string,
        }
      }
    });

    const byNameOrSpouse = await prisma.subscriber.findMany({
      select: {
        id: true
      },
      where: {
        OR: [
          {
            name: {
              contains: term as string
            }
          },
          {
            spouse: {
              contains: term as string
            }
          }
        ]
      }
    });

    let subscriberIds: number[] = [];
    byNameOrSpouse.map(({ id }) => subscriberIds.push(id));
    byAddress.map(({ subscriberId }) => subscriberIds.push(subscriberId!));

    const subscribers = await prisma.subscriber.findMany({
      where: {
        id: { in: subscriberIds }
      },
      include: {
        subscriptions: {
          select: {
            address: true
          },
          where:
          {
            address: { contains: term as string}
          }
        }
      }
    });

    res.status(201).json(subscribers);

    return;
  }
}

export default searchApiHandler;
