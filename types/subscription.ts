export interface Subscription {
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
