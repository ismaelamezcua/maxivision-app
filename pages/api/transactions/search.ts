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
    const { date } = req.body;

    const minDate = new Date(date);
    let maxDate = new Date();
    maxDate.setDate(minDate.getDate() + 1);

    const transactions = await prisma.transaction.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: minDate
            }
          },
          {
            createdAt: {
              lte: maxDate
            }
          }
        ]
      }
    });

    res.status(201).json(transactions);

    return;
  }
}

export default searchApiHandler;
