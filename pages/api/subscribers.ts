import type { NextApiRequest, NextApiResponse } from "next";
import type { Subscriber } from '../../types/subscriber';

const responseData: Subscriber[] = [
  { key: '1', name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { key: '2', name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
  { key: '3', name: 'Tom Cook', title: 'Director, Product Development', email: 'tom.cook@example.com', role: 'Member' },
  { key: '4', name: 'Whitney Francis', title: 'Copywriter', email: 'whitney.francis@example.com', role: 'Admin' },
  { key: '5', name: 'Leonard Krasner', title: 'Senior Designer', email: 'leonard.krasner@example.com', role: 'Owner' },
  { key: '6', name: 'Floyd Miles', title: 'Principal Designer', email: 'floyd.miles@example.com', role: 'Member' },
];

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    setTimeout(() => {
      res.status(200).json(responseData);
    }, 1000)
  } else {
    res.status(200).json({ data: 'No Data' });
  }
};
