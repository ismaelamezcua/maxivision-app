/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';
import subscribersApiHandler from '../../../pages/api/subscribers';
import { Subscriber } from '../../../types';

describe('/api/subscribers API endpoint', () => {
  function mockRequestResponse(method: RequestMethod = 'GET') {
    const { req, res }: { req: NextApiRequest, res: NextApiResponse } = createMocks({ method });
    req.headers = {
      'content-type': 'application/json'
    };

    return { req, res };
  }

  it('should return 201 subscriber created with POST method', async () => {
    const subscriberMock: Subscriber = {
      name: 'Testing Subject',
      email: 'test@email.com',
      phone: '000-000-0000',
      rfc: 'TEST000',
      spouse: '',
    };

    const { req, res } = mockRequestResponse('POST');
    req.body = subscriberMock;

    await subscribersApiHandler(req, res);

    expect(res.statusCode).toBe(201);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
  });

  it('should return 501 method not supported for GET method', async () => {
    const { req, res } = mockRequestResponse();
    
    await subscribersApiHandler(req, res);

    expect(res.statusCode).toBe(501);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
  });

  it('should return 501 method not supported for PUT method', async () => {
    const { req, res } = mockRequestResponse('PUT');
    
    await subscribersApiHandler(req, res);

    expect(res.statusCode).toBe(501);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
  });

  it('should return 501 method not supported for DELETE method', async () => {
    const { req, res } = mockRequestResponse('DELETE');
    
    await subscribersApiHandler(req, res);

    expect(res.statusCode).toBe(501);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
  });
});