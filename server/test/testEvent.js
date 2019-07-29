// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const server = require('../../server');
const request = require('supertest');
const db = require('../models');
const usersSeed = require('../scripts/usersSeed.json');
const eventsSeed = require('../scripts/eventsSeed.json');
const testUtils = require('./testUtils');
const utils = require('../scripts/utils');

const expect = chai.expect;


createEvent = async (body) => {
  const event = await db.Event.create(body);
  await db.UserEvent.create({ user_id: event.creator, event_id: event._id });
};

//Our parent block
describe('Event', () => {

  beforeEach(async () => { // Before each test we empty the database
    // Seed DB with users
    await utils.dropAllCollections();
    // Add all users
    await testUtils.seedUsers(usersSeed);

    const savedUsers = await db.User.find();

    // Add all events
    await utils.asyncForEach(eventsSeed, async (item, index) => {
      const user = savedUsers[index];
      const event = item;
      event.creator = user._id;
      try {
        await createEvent(event);
      } catch (err) {
        console.log(err);
      }
    });
  });

  after(async () => {
    await utils.dropAllCollections();
  });

  describe('/GET /api/events', () => {
    it('it should GET all the events', async () => {
      const res = await request(server).get('/api/events');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body.length).to.equal(6);
    });
  });

  describe('GET /api/events/:id', () => {

    it('it should GET an Event by the given id', async () => {
      const savedUser = await db.User.create(testUtils.user);
      testUtils.event.creator = savedUser._id.toString();
      const savedEvent = await db.Event.create(testUtils.event);
      const res = await request(server).get(`/api/events/${savedEvent._id.toString()}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('description');
      expect(res.body).to.have.property('title');
      expect(res.body).to.have.property('_id', savedEvent._id.toString());
    });

    it('it should raise a 422 error with an invalid event id', async () => {
      const res = await request(server).get('/api/events/1');
      expect(res.status).to.equal(422);
    });

    it('it should return null if event is not found with a valid event id', async () => {
      const res = await request(server).get('/api/events/111111111111111111111111');
      expect(res.status).to.equal(200);
    });
  });

  describe('POST /api/events', async () => {

    it('should return event when the all request body is valid', async () => {
      const savedUser = await db.User.create(testUtils.user);
      testUtils.event.creator = savedUser._id.toString();

      const res = await request(server)
        .post('/api/events')
        .send(testUtils.event);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('creator', savedUser._id.toString());
      expect(res.body).to.have.property('title', testUtils.event.title);
    });

    it('should not create a Event document if user does not exist', async () => {
      testUtils.event.creator = '111111111111111111111111';
      const res = await request(server)
        .post('/api/events')
        .send(testUtils.event);
      expect(res.status).to.be.eql(404);
      expect(res.body).to.have.property('message');
    });

    it('should create a UserEvent document after the event is created successfully', async () => {
      const savedUser = await db.User.create(testUtils.user);
      testUtils.event.creator = savedUser._id.toString();

      const eventRes = await request(server)
        .post('/api/events')
        .send(testUtils.event);
      const userEventRes = await request(server)
        .get(`/api/userEvents/${savedUser._id.toString()}/${eventRes.body._id}`)
        .send(testUtils.event);
      expect(userEventRes.body).to.have.property('_id');
    });
  });

  describe('PUT /:id', () => {
    it('should update the existing event and return 200', async () => {
      const savedUser = await db.User.create(testUtils.user);
      testUtils.event.creator = savedUser._id.toString();

      const newEvent = new db.Event(testUtils.event);
      await newEvent.save();

      const res = await request(server)
        .put('/api/events/' + newEvent._id)
        .send({
          description: 'descTest',
          title: 'titleTest',
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('description', 'descTest');
    });
  });

  describe('DELETE /:id', () => {
    it('should delete requested id and return response 200', async () => {
      const newEvent = new db.Event(testUtils.event);
      await newEvent.save();

      const res = await request(server).delete('/api/events/' + newEvent._id);
      expect(res.status).to.be.equal(200);
    });

    it('should delete requested id, delete all UserEvents with field event_id === id, and return response 200', async () => {
      const event = await db.Event.findOne({});

      await request(server).delete('/api/events/' + event._id);
      const founduserEvents = await db.UserEvent.find({ event_id: event.id });
      expect(founduserEvents.length).to.be.equal(0);
    });

    it('should raise 422 when deleted event id is not a valid _id', async () => {

      res = await request(server).get('/api/events/1');
      expect(res.status).to.be.equal(422);
    });

    it('should return null when deleted event does not exist', async () => {

      res = await request(server).get('/api/events/111111111111111111111111');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.null;
    });
  });
});