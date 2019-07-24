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
    await utils.dropAllCollections();
  });

  describe('/GET /api/userEvents', () => {
    it('it should GET all the UserEvents', async () => {
      const res = await request(server).get('/api/userEvents');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body.length).to.equal(6);
    });
  });

  describe('GET /api/userEvent/user/:id', () => {

    it('it should GET all UserEvent docs for a user id', async () => {
      const savedUser = await db.User.create(user);
      event.creator = savedUser._id.toString();

      const savedEvent = await request(server)
        .post('/api/events')
        .send(event);

      // Add user to one more event that is not the event first created
      const otherEvent = await db.Event.findOne({ _id: { $ne: savedEvent._id } });
      db.UserEvent.create({ user_id: savedUser._id.toString(), event_id: otherEvent._id });

      const res = await request(server).get(`/api/userEvents/user/${savedUser._id.toString()}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body.length).to.equal(2);
    });

    it('it should raise a 422 error with an invalid event id', async () => {
      const res = await request(server).get('/api/userEvents/users/1');
      expect(res.status).to.equal(422);
    });

    it('it should return null if event is not found with a valid event id', async () => {
      const res = await request(server).get('/api/userEvents/user/111111111111111111111111');
      expect(res.status).to.equal(200);
    });
  });

  describe('GET /api/userEvent/event/:id', () => {

    it('it should GET all UserEvent docs for an event id', async () => {
      const savedUser = await db.User.create(user);
      event.creator = savedUser._id.toString();

      const savedEvent = await request(server)
        .post('/api/events')
        .send(event);

      // Add another to event that is not the user first created
      const otherUser = await db.Event.findOne({ _id: { $ne: savedUser._id.toString() } });
      db.UserEvent.create({ user_id: otherUser._id.toString(), event_id: savedEvent.body._id });

      const res = await request(server).get(`/api/userEvents/event/${savedEvent.body._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body.length).to.equal(2);
    });

    it('it should raise a 422 error with an invalid event id', async () => {
      const res = await request(server).get('/api/userEvents/event/1');
      expect(res.status).to.equal(422);
    });

    it('it should return null if event is not found with a valid event id', async () => {
      const res = await request(server).get('/api/userEvents/event/111111111111111111111111');
      expect(res.status).to.equal(200);
    });
  });

  describe('POST /api/userEvents', async () => {

    it('should return the UserEvent when the all request body is valid', async () => {
      const savedUser = await db.User.create(user);
      event.creator = savedUser._id.toString();
      const newEvent = await db.Event.create(event);

      const res = await request(server)
        .post('/api/userEvents')
        .send({ event_id: newEvent._id.toString(), user_id: savedUser._id.toString() });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('user_id', savedUser._id.toString());
      expect(res.body).to.have.property('event_id', newEvent._id.toString());
    });

    it('should not create a UserEvent document if user is already atttending event', async () => {
      const savedUser = await db.User.create(user);
      event.creator = savedUser._id.toString();
      const newEvent = await request(server)
        .post('/api/events')
        .send(event);
      const res = await request(server)
        .post('/api/userEvents/')
        .send({ event_id: newEvent.body._id.toString(), user_id: savedUser._id.toString() });
      expect(res.status).to.be.eql(400);
      expect(res.body).to.have.property('message');
    });

    it('should not create a UserEvent document if user id is invalid', async () => {
      const foundEvent = await db.Event.findOne({});
      const res = await request(server)
        .post('/api/userEvents')
        .send({ event_id: foundEvent._id.toString(), user_id: '1' });
      expect(res.status).to.be.eql(422);
      expect(res.body).to.have.property('message');
    });

    it('should not create a UserEvent document if user does not exist', async () => {
      const foundEvent = await db.Event.findOne({});
      const res = await request(server)
        .post('/api/userEvents')
        .send({ event_id: foundEvent._id.toString(), user_id: '111111111111111111111111' });
      expect(res.status).to.be.eql(404);
      expect(res.body).to.have.property('message');
    });

    it('should not create a UserEvent document if event id is invalid', async () => {
      const foundUser = await db.User.findOne({});
      const res = await request(server)
        .post('/api/userEvents')
        .send({ event_id: '1', user_id: foundUser._id.toString() });
      expect(res.status).to.be.eql(422);
      expect(res.body).to.have.property('message');
    });

    it('should not create a UserEvent document if event id is invalid', async () => {
      const foundUser = await db.User.findOne({});
      const res = await request(server)
        .post('/api/userEvents')
        .send({ event_id: '111111111111111111111111', user_id: foundUser._id.toString() });
      expect(res.status).to.be.eql(404);
      expect(res.body).to.have.property('message');
    });

    it('should not create a UserEvent document if neith event id and user id exist', async () => {
      const res = await request(server)
        .post('/api/userEvents')
        .send({ event_id: '111111111111111111111111', user_id: '111111111111111111111111' });
      expect(res.status).to.be.eql(404);
      expect(res.body).to.have.property('message');
    });
  });

  // describe('DELETE /:id', () => {
  //   it('should delete requested id and return response 200', async () => {
  //     const newEvent = new db.Event(event);
  //     await newEvent.save();

  //     const res = await request(server).delete('/api/events/' + newEvent._id);
  //     expect(res.status).to.be.equal(200);
  //   });

  //   it('should delete requested id, delete all UserEvents with field event_id === id, and return response 200', async () => {
  //     const event = await db.Event.findOne({});

  //     await request(server).delete('/api/events/' + event._id);
  //     const founduserEvents = await db.UserEvent.find({ event_id: event.id });
  //     expect(founduserEvents.length).to.be.equal(0);
  //   });

  //   it('should raise 422 when deleted event id is not a valid _id', async () => {

  //     res = await request(server).get('/api/events/1');
  //     expect(res.status).to.be.equal(422);
  //   });

  //   it('should return null when deleted event does not exist', async () => {

  //     res = await request(server).get('/api/events/111111111111111111111111');
  //     expect(res.status).to.be.equal(200);
  //     expect(res.body).to.be.null;
  //   });
  // });
});