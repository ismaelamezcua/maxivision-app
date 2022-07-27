import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';

import { ServiceReport } from '@/types';

const serviceReportsApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET' || req.method === 'PUT' || req.method === 'DELETE') {
    /* Method not supported for this API endpoint, use /api/search to retrieve subscribers */
    res.status(501).json({ status: 'Method not supported by the server and cannot be handled.' });
    return;
  } else if (req.method === 'POST') {
    /* Create a new contract */
    const { description, status, comments, subscriptionId } = req.body as ServiceReport;

    const serviceReport = await prisma.serviceReport.create({
      data: {
        description,
        status,
        comments,
        subscriptionId: Number(subscriptionId),
      },
    });

    res.status(201).json(serviceReport);
    return;
  }
};

export default serviceReportsApiHandler;
 