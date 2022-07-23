export interface Subscriber {
  id?: number;
  name: string;
  email: string;
  phone: string;
  rfc: string;
  spouse: string;
};

export interface ResponseError {
  status: string;
  error: string;
}
