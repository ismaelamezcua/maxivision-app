export interface Contract {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  address: string;
  suburb: string;
  identifier: string;
  tvCount: number;
  status: string;
  cfe?: string;
  remakers?: string;
  subscriberId?: number;
};
