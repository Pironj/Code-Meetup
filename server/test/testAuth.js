// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const server = require('../../server');
const request = require('supertest');
const db = require('../models');
const utils = require('../scripts/utils');
const testUtils = require('./testUtils');

const expect = chai.expect;

//Our parent block
describe('User', () => {

  beforeEach(async () => { // Before each test we empty the database
    // Seed DB with users
    await utils.dropAllCollections();
  });

  after(async () => {
    await utils.dropAllCollections();
  });

  describe('POST /auth/signup', () => {
    it('should return user and token when the all request body is valid', async () => {
      const res = await request(server)
        .post('/auth/signup')
        .send(testUtils.user);
      expect(res.status).to.equal(200);
      const user = res.body.user;
      expect(user).to.have.property('email', testUtils.user.email);
      expect(user).to.have.property('first_name', 'first');
      expect(res.body).to.have.property('token');
    });

    // add more tests to validate request body accordingly eg, make sure name is more than 3 characters etc
  });

  describe('POST /auth/login', () => {
    it('should return user and token when the email and password are valid', async () => {
      await db.User.create(testUtils.user);
      const res = await request(server)
        .post('/auth/login')
        .send({ email: testUtils.user.email, password: testUtils.user.password });
      expect(res.status).to.equal(200);
      const user = res.body.user;
      expect(user).to.have.property('email', testUtils.user.email);
      expect(user).to.have.property('first_name', testUtils.user.first_name);
      expect(res.body).to.have.property('token');
    });

    it('should not return user and token when the email is valid, but the password is not valid', async () => {
      await db.User.create(testUtils.user);
      const res = await request(server)
        .post('/auth/login')
        .send({ email: testUtils.user.email, password: '12345' });
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('message');
    });

    it('should not return user and token when the email is not valid', async () => {
      await db.User.create(testUtils.user);
      const res = await request(server)
        .post('/auth/login')
        .send({ email: 'notanemail@email.com', password: '1234' });
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('message');
    });

    it('should not return user and token when credentials are not provided', async () => {
      await db.User.create(testUtils.user);
      const res = await request(server)
        .post('/auth/login')
        .send();
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('message');
    });
  });

  describe('GET /auth/protected/:id', () => {
    it('should access protected route with validated credentials', async () => {
      const newUser = await request(server)
        .post('/auth/signup')
        .send(testUtils.user);

      const authRes = await request(server)
        .get('/auth/protected/' + newUser.body.user._id)
        .set('Authorization', 'bearer ' + newUser.body.token);

      expect(authRes.body).to.have.property('message', 'I\'m protected!');
    });

    it('should not access a protected route with invalidated credentials', async () => {
      const newUser = await request(server)
        .post('/auth/signup')
        .send(testUtils.user);

      const otherUser = await request(server)
        .post('/auth/signup')
        .send({
          first_name: 'first',
          last_name: 'last',
          password: '1234',
          email: 'otheruser@email.com'
        });

      const authRes = await request(server)
        .get('/auth/protected/' + newUser.body.user._id)
        .set('Authorization', 'bearer ' + otherUser.body.token);

      expect(authRes.body).to.have.property( 'message', 'You are not authorized to perform this action');
    });
  });

});