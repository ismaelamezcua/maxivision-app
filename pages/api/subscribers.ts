import type { NextApiRequest, NextApiResponse } from "next";
import type { Subscriber, ResponseError } from '../../types';

const responseData: Subscriber[] = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
  { name: 'Tom Cook', title: 'Director, Product Development', email: 'tom.cook@example.com', role: 'Member' },
  { name: 'Whitney Francis', title: 'Copywriter', email: 'whitney.francis@example.com', role: 'Admin' },
  { name: 'Leonard Krasner', title: 'Senior Designer', email: 'leonard.krasner@example.com', role: 'Owner' },
  { name: 'Floyd Miles', title: 'Principal Designer', email: 'floyd.miles@example.com', role: 'Member' },
];

export default (req: NextApiRequest, res: NextApiResponse<Subscriber[] | ResponseError>) => {
  if (req.method === 'POST') {
    setTimeout(() => {
      res.status(200).json(responseData);
    }, 4000)
  } else if (req.method === 'GET') {
    console.log(req.body)
    res.status(200).json(responseData);
  }
};
