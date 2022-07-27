interface Subscriber {
  id?: number;
  createdAt?: string;
  name: string;
  email: string;
  phone: string;
  rfc: string;
  spouse: string;
};

interface Subscription {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  address: string;
  suburb: string;
  identifier: string;
  tvCount: number;
  status: string;
  cfe?: string;
  remarks?: string;
  subscriberId?: number;
};

interface Transaction {
  id?: number;
  createdAt?: string;
  type: string;
  price: number;
  concept: string;
  receiptId?: string;
  subscriptionId?: number;
};

interface ServiceReport {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  description: string;
  status: string;
  comments: string;
  subscriptionId?: number;
};

export type {
  Subscriber,
  Subscription,
  Transaction,
  ServiceReport,
};
