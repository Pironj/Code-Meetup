// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const server = require('../../server');
const request = require('supertest');
const db = require('../models');
const usersSeed = require('../scripts/usersSeed.json');
const eventsSeed = require('../scripts/eventsSeed.json');
const utils = require('../scripts/utils');

const expect = chai.expect;

const event = {
  title: 'Test title',
  description: 'Test Description',
  creator: '',
};

const user = {
  google_id: '123456',
  first_name: 'first',
  last_name: 'last',
  picture: 'pictureUrl',
  email: 'user@email.com'
};

createEvent = async (body) => {
  const event = await db.Event.create(body);
  await db.UserEvent.create({ user_id: event.creator, event_id: event._id });
};

//Our parent block
describe('Event', () => {

  beforeEach(async () => { // Before each test we empty the database
    await utils.dropAllCollections();
    await db.User.collection.insertMany(usersSeed);

    await utils.asyncForEach(eventsSeed, async (item, index) => {
      const savedUser = await db.User.find({ google_id: usersSeed[index].google_id });
      const user = savedUser[0];
      const event = item;
      event.creator = user._id;
      await createEvent(event);
    });
  });

  after(async () => {
    await db.User.deleteMany({});
    // process.exit(0);
  });

  describe('/GET /api/events', () => {
    it('it should GET all the events', async () => {
      const res = await request(server).get('/api/events');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body.length).to.equal(3);
    });
  });

  // describe('GET /api/users/:id', () => {
  //   it('it should GET a User by the given id', async () => {
  //     const newUser = new db.User(user);
  //     const savedUser = await newUser.save();
  //     const res = await request(server).get(`/api/users/${savedUser._id}`);
  //     expect(res.status).to.equal(200);
  //     expect(res.body).to.have.property('first_name');
  //     expect(res.body).to.have.property('last_name');
  //     expect(res.body).to.have.property('email');
  //     expect(res.body).to.have.property('picture');
  //     expect(res.body).to.have.property('_id', savedUser._id.toString());
  //   });

  //   it('it should raise a 404 error with an invalid user id', async () => {
  //     const res = await request(server).get('/api/users/1');
  //     expect(res.status).to.equal(404);
  //   });

  //   it('it should return null if user is not found with a valid user id', async () => {
  //     const res = await request(server).get('/api/users/111111111111111111111111');
  //     expect(res.status).to.equal(200);
  //   });
  // });

  describe('POST /api/events', async () => {

    it('should return event when the all request body is valid', async () => {
      const savedUser = await db.User.create(user);
      event.creator = savedUser._id.toString();

      const res = await request(server)
        .post('/api/events')
        .send(event);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('creator', savedUser._id.toString());
      expect(res.body).to.have.property('title', event.title);
    });

    it('should not create a Event document if user does not exist', async () => {
      event.creator = '111111111111111111111111';

      const res = await request(server)
        .post('/api/events')
        .send(event);

      expect(res.status).to.be.eql(404);
      expect(res.body).to.have.property('message');
    });

    it('should create a UserEvent document', async () => {
      const savedUser = await db.User.create(user);
      event.creator = savedUser._id.toString();

      const eventRes = await request(server)
        .post('/api/events')
        .send(event);
      const userEventRes = await request(server)
        .get(`/api/userEvents/${savedUser._id.toString()}/${eventRes.body._id}`)
        .send(event);
      expect(userEventRes.body).to.have.property('_id');
    });
  });

  //   // add more tests to validate request body accordingly eg, make sure name is more than 3 characters etc

  // describe('PUT /:id', () => {
  //   it('should update the existing order and return 200', async () => {
  //     const newUser = new db.User(user);
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
  //     const newUser = new db.User(user);
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