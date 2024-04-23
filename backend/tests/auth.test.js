import request from 'supertest';
import app from '../server'; 
import User from '../models/User';
import mongoose from 'mongoose';  

describe('Authentication API', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('POST /api/auth/signup - It should register a user', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: '123456',
        rePassword: '123456'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('email', 'john@example.com');
  });

  test('POST /api/auth/login - It should login the user', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: '123456',
        rePassword: '123456'
      });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'jane@example.com',
        password: '123456'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
