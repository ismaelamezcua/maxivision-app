export interface Subscriber {
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
