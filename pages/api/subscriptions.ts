import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma';
import { PrismaClient } from "@prisma/client";

const subscriptionsApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET' || req.method === 'PUT' || req.method === 'DELETE') {
    /* Method not supported for this API endpoint, use /api/search to retrieve subscribers */
    res.status(501).json({ status: 'Method not supported by the server and cannot be handled.' });
    return;
  } else if (req.method === 'POST') {
    /* Create a new contract */
    const {
      address,
      suburb,
      identifier,
      tvCount,
      status,
      cfe,
      remarks,
      subscriberId,
    } = req.body;

    const subscription = await prisma.subscription.create({
      data: {
        address,
        suburb,
        identifier,
        tvCount,
        status,
        cfe,
        remarks,
        subscriberId,
      },
    });

    res.status(201).json(subscription);
    return;
  }
};

export default subscriptionsApiHandler;
