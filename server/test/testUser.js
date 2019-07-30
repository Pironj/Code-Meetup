// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const server = require('../../server');
const request = require('supertest');
const db = require('../models');
const usersSeed = require('../scripts/usersSeed.json');
const utils = require('../scripts/utils');
const testUtils = require('./testUtils');

const expect = chai.expect;

//Our parent block
describe('User', () => {

  beforeEach(async () => { // Before each test we empty the database
    // Seed DB with users
    await utils.dropAllCollections();
    // Add all users
    await testUtils.seedUsers(usersSeed);
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
      const savedUser = await db.User.create(testUtils.user);
      const res = await request(server).get(`/api/users/${savedUser._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('first_name');
      expect(res.body).to.have.property('last_name');
      expect(res.body).to.have.property('email');
      // expect(res.body).to.have.property('picture');
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

  describe('PUT /:id', () => {
    it('should update the existing order and return 200', async () => {
      const newUser = new db.User(testUtils.user);
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
      const newUser = new db.User(testUtils.user);
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