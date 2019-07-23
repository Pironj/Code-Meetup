// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const server = require('../../server');
const request = require('supertest');
const db = require('../models');
const usersSeed = require('../scripts/usersSeed.json');
const utils = require('../scripts/utils');

const expect = chai.expect;

const user = {
  google_id: '123456',
  first_name: 'first',
  last_name: 'last',
  picture: 'pictureUrl',
  email: 'user@email.com'
};

//Our parent block
describe('User', () => {

  beforeEach(async () => { // Before each test we empty the database
    await utils.dropAllCollections(); // Seed DB with users
    await db.User.collection.insertMany(usersSeed);
  });

  after(async () => {
    await utils.dropAllCollections();
  });

  describe('/GET /api/users', () => {
    it('it should GET all the users', async () => {
      const res = await request(server).get('/api/users');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body.length).to.equal(6);
    });
  });

  describe('GET /api/users/:id', () => {
    it('it should GET a User by the given id', async () => {
      const savedUser = await db.User.create(user);
      const res = await request(server).get(`/api/users/${savedUser._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('first_name');
      expect(res.body).to.have.property('last_name');
      expect(res.body).to.have.property('email');
      expect(res.body).to.have.property('picture');
      expect(res.body).to.have.property('_id', savedUser._id.toString());
    });

    it('it should raise a 422 error with an invalid user id', async () => {
      const res = await request(server).get('/api/users/1');
      expect(res.status).to.equal(422);
    });

    it('it should return null if user is not found with a valid user id', async () => {
      const res = await request(server).get('/api/users/111111111111111111111111');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });

  describe('POST /api/users', () => {
    it('should return user when the all request body is valid', async () => {
      const res = await request(server)
        .post('/api/users')
        .send(user);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('google_id', user.google_id);
      expect(res.body).to.have.property('first_name', 'first');
    });

    // add more tests to validate request body accordingly eg, make sure name is more than 3 characters etc
  });

  describe('PUT /:id', () => {
    it('should update the existing order and return 200', async () => {
      const newUser = new db.User(user);
      await newUser.save();

      const res = await request(server)
        .put('/api/users/' + newUser._id)
        .send({
          first_name: 'newTest',
          email: 'newemail@gmail.com',
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('first_name', 'newTest');
    });
  });

  describe('DELETE /:id', () => {
    it('should delete requested id and return response 200', async () => {
      const newUser = new db.User(user);
      await newUser.save();

      const res = await request(server).delete('/api/users/' + newUser._id);
      expect(res.status).to.be.equal(200);
    });

    it('should return null when deleted user does not exist', async () => {

      res = await request(server).get('/api/users/111111111111111111111111');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.null;
    });
  });
});