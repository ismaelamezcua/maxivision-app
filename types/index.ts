export interface Subscriber {
  name: string;
  title: string;
  email: string;
  role: string;
};

export interface ResponseError {
  status: string;
  error: string;
}
