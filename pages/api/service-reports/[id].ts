import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma';
import { ServiceReport } from "@/types";

const serviceReportApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    /* Return subscriber with [id] */
    const { id } = req.query;

    const serviceReport = await prisma.serviceReport.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });

    serviceReport !== null
      ? res.status(200).json(serviceReport)
      : res.status(404).json({ status: `Suscription with id ${id} not found.` });

    return;
  } else if (req.method === 'POST') {
    /* Method not supported for this API endpoint, use /api/subscribers to create new subscribers */
    res.status(501).json({ status: 'Method not supported by the server and cannot be handled.' });

    return;
  } else if (req.method === 'PUT') {
    /* Update details for subscriber [id] if it exists */
    const { id } = req.query;

    const { description, status, comments, subscriptionId } = req.body as ServiceReport;

    const serviceReport = await prisma.serviceReport.update({
      where: {
        id: parseInt(id as string)
      },
      data: {
        description,
        status,
        comments,
        subscriptionId,
      },
    });

    serviceReport !== null
      ? res.status(200).json(serviceReport)
      : res.status(409).json({ status: 'Could not update the suscription.' });

    return;
  } else if (req.method === 'DELETE') {
    /* Remove subscriber [id] */
    const { id } = req.query;

    const serviceReport = await prisma.serviceReport.delete({
      where: {
        id: parseInt(id as string)
      }
    });

    res.status(204).json({ status: `Service Report with id ${id} deleted.` });

    return;
  }
};

export default serviceReportApiHandler;
