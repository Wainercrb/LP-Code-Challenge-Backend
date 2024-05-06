import request from 'supertest';
import express from 'express';
import { bootstrap } from '../src/index';

describe('[express-app]', () => {
  let app: express.Application;

  beforeAll(() => {
    app = bootstrap();
  });

  it('Should set up the config properly', async () => {
    const { status, header } = await request(app).get('/');
    expect(status).toBe(200);
    expect(header['access-control-allow-credentials']).toBe('true');
  });
});
