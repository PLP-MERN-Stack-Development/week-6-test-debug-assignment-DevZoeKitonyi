const request = require('supertest');
const { app } = require('../../src/app');
const User = require('../../src/models/User');
const { generateToken } = require('../../src/utils/auth');
const mongoose = require('mongoose');

describe('Auth Middleware', () => {
  let token;
  let userId;

  beforeEach(async () => {
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    userId = user._id;
    token = generateToken(user);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should return 401 if no token is provided', async () => {
    const res = await request(app).post('/api/posts').send({
      title: 'Test Post',
      content: 'This is a test post content',
      category: new mongoose.Types.ObjectId().toString(),
    });
    expect(res.status).toBe(401);
  });

  it('should return 401 if token is invalid', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', 'Bearer invalidtoken')
      .send({
        title: 'Test Post',
        content: 'This is a test post content',
        category: new mongoose.Types.ObjectId().toString(),
      });
    expect(res.status).toBe(401);
  });
});