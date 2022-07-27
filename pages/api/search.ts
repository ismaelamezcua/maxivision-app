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

    const subscribers = await prisma.subscriber.findMany({
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
          },
        ],
      },
      orderBy: [
        { name: 'desc' },
        { spouse: 'desc' },
      ],
    });

    res.status(201).json(subscribers);

    return;
  }
}

export default searchApiHandler;
