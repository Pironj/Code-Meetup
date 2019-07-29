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
    // await testUtils.seedUsers(usersSeed);
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
      expect(res.body).to.have.property('token')
    });

    // add more tests to validate request body accordingly eg, make sure name is more than 3 characters etc
  });

  describe('POST /auth/login', () => {
    it('should return user and token when the all request body is valid', async () => {
      const savedUser = await db.User.create(testUtils.user);
      console.log({ email: testUtils.user.email, password: testUtils.user.password })
      const res = await request(server)
        .post('/auth/login')
        .send({ email: testUtils.user.email, password: testUtils.user.password });
      console.log(res.body)
      expect(res.status).to.equal(200);
      const user = res.body.user;
      expect(user).to.have.property('email', testUtils.user.email);
      expect(user).to.have.property('first_name', testUtils.user.first_name);
      expect(res.body).to.have.property('token')
    });
  });

  // describe('GET /auth/protected/:id', () => {
  //   it('should be able to access the protected route in authenticated and authorized', async () => {
  //     const savedUser = await request(server)
  //       .post('/auth/signup')
  //       .send(testUtils.user);
  //     console.log(savedUser.body)
  //     const res = await request(server)
  //       .get('/auth/protected' + savedUser.body.user._id)
  //       .set('Authorization', 'Bearer ' + savedUser.body.token)

  //     expect(res.status).to.equal(200);
  //     console.logO(res.body)
      // const user = res.body.user;
      // expect(user).to.have.property('email', testUtils.user.email);
      // expect(user).to.have.property('first_name', testUtils.user.first_name);
      // expect(res.body).to.have.property('token')
    // });

    // add more tests to validate request body accordingly eg, make sure name is more than 3 characters etc
  // });

  // describe('/GET /api/users', () => {
  //   it('it should GET all the users', async () => {
  //     const res = await request(server).get('/api/users');
  //     expect(res.status).to.equal(200);
  //     expect(res.body).to.be.a('array');
  //     expect(res.body.length).to.equal(6);
  //   });
  // });

  // describe('GET /api/users/:id', () => {
  //   it('it should GET a User by the given id', async () => {
  //     const savedUser = await db.User.create(testUtils.user);
  //     const res = await request(server).get(`/api/users/${savedUser._id}`);
  //     expect(res.status).to.equal(200);
  //     expect(res.body).to.have.property('first_name');
  //     expect(res.body).to.have.property('last_name');
  //     expect(res.body).to.have.property('email');
  //     // expect(res.body).to.have.property('picture');
  //     expect(res.body).to.have.property('_id', savedUser._id.toString());
  //   });

  //   it('it should raise a 422 error with an invalid user id', async () => {
  //     const res = await request(server).get('/api/users/1');
  //     expect(res.status).to.equal(422);
  //   });

  //   it('it should return null if user is not found with a valid user id', async () => {
  //     const res = await request(server).get('/api/users/111111111111111111111111');
  //     expect(res.status).to.equal(200);
  //     expect(res.body).to.be.null;
  //   });
  // });



  // describe('PUT /:id', () => {
  //   it('should update the existing order and return 200', async () => {
  //     const newUser = new db.User(testUtils.user);
  //     await newUser.save();

  //     const res = await request(server)
  //       .put('/api/users/' + newUser._id)
  //       .send({
  //         first_name: 'newTest',
  //         email: 'newemail@gmail.com',
  //       });

  //     expect(res.status).to.equal(200);
  //     expect(res.body).to.have.property('first_name', 'newTest');
  //   });
  // });

  // describe('DELETE /:id', () => {
  //   it('should delete requested id and return response 200', async () => {
  //     const newUser = new db.User(testUtils.user);
  //     await newUser.save();

  //     const res = await request(server).delete('/api/users/' + newUser._id);
  //     expect(res.status).to.be.equal(200);
  //   });

  //   it('should return null when deleted user does not exist', async () => {

  //     res = await request(server).get('/api/users/111111111111111111111111');
  //     expect(res.status).to.be.equal(200);
  //     expect(res.body).to.be.null;
  //   });
  // });
});