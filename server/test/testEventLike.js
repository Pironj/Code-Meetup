// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const server = require('../../server');
const request = require('supertest');
const db = require('../models');
const testUtils = require('./utilsForTests');
const utils = require('../scripts/utils');

const expect = chai.expect;


createEvent = async (body) => {
  const event = await db.Event.create(body);
  await db.UserEvent.create({ user_id: event.creator, event_id: event._id });
};

//Our parent block
describe('EventLike', () => {

  beforeEach(async () => { // Before each test we empty the database
    // Seed DB with users
    await utils.dropAllCollections();

    this.newUserRes = await request(server)
      .post('/auth/signup')
      .send(testUtils.user);

    this.otherUserRes = await request(server)
      .post('/auth/signup')
      .send(testUtils.otherUser);

  });

  after(async () => {
    await utils.dropAllCollections();
  });

  // describe('GET /api/eventLikes/event/:id', () => {

  //   it('it should GET all EventLike docs for an event id', async () => {
  //     testUtils.event.creator = this.newUserRes.body.user._id.toString();

  //     const savedEvent = await request(server)
  //       .post('/api/events')
  //       .set('Authorization', 'bearer ' + this.newUserRes.body.token)
  //       .send(testUtils.event);

  //     // Have two users like the event
  //     await db.EventLike.create({ user_id: this.newUserRes.body.user._id.toString(), event_id: savedEvent.body._id });
  //     await db.EventLike.create({ user_id: this.otherUserRes.body.user._id.toString(), event_id: savedEvent.body._id });

  //     const eventLikeRes = await request(server).get(`/api/eventLikes/event/${savedEvent.body._id}`);
  //     expect(eventLikeRes.status).to.equal(200);
  //     expect(eventLikeRes.body).to.be.a('array');
  //     expect(eventLikeRes.body.length).to.equal(2);
  //   });

  //   it('it should raise a 422 error with an invalid event id', async () => {
  //     const res = await request(server).get('/api/eventLikes/event/1');
  //     expect(res.status).to.equal(422);
  //   });

  //   it('it should return null if event is not found with a valid event id', async () => {
  //     const res = await request(server).get('/api/eventLikes/event/111111111111111111111111');
  //     expect(res.status).to.equal(200);
  //   });
  // });

  // describe('POST /api/eventLikes', async () => {

  //   it('should return the EventLike when the request body is valid', async () => {

  //     testUtils.event.creator = this.newUserRes.body.user._id.toString();

  //     // Create event without a EventLike document
  //     const newEvent = await db.Event.create(testUtils.event);

  //     // Have user like the event
  //     const postRes = await request(server)
  //       .post('/api/eventLikes')
  //       .set('Authorization', 'bearer ' + this.newUserRes.body.token)
  //       .send({ event_id: newEvent._id.toString() });

  //     expect(postRes.status).to.equal(200);
  //     expect(postRes.body.user_id).to.equal(this.newUserRes.body.user._id.toString());
  //     expect(postRes.body.event_id).to.equal(newEvent._id.toString());
  //   });

  //   it('should NOT create the EventLike with invalid credentials', async () => {

  //     testUtils.event.creator = this.newUserRes.body.user._id.toString();

  //     // Create event without any EventLike documents
  //     const newEvent = await db.Event.create(testUtils.event);

  //     // Have user try to like event without auth
  //     const postRes = await request(server)
  //       .post('/api/eventLikes')
  //       .send({ event_id: newEvent._id.toString() });

  //     expect(postRes.status).to.equal(401);
  //     expect(postRes.body).to.have.property('message', 'No auth token');
  //   });

  //   it('should prevent duplicate EventLike documents if user already likes the event', async () => {
  //     testUtils.event.creator = this.newUserRes.body.user._id.toString();

  //     const savedEvent = await request(server)
  //       .post('/api/events')
  //       .set('Authorization', 'bearer ' + this.newUserRes.body.token)
  //       .send(testUtils.event);

  //     await request(server)
  //       .post('/api/eventLikes/')
  //       .set('Authorization', 'bearer ' + this.newUserRes.body.token)
  //       .send({ event_id: savedEvent.body._id.toString() });

  //     const res = await request(server)
  //       .post('/api/eventLikes/')
  //       .set('Authorization', 'bearer ' + this.newUserRes.body.token)
  //       .send({ event_id: savedEvent.body._id.toString() });

  //     expect(res.status).to.be.eql(400);
  //     expect(res.body.message).to.equal('User already likes event');
  //   });

  //   it('should not create an EventLike document if user id is invalid', async () => {
  //     testUtils.event.creator = this.newUserRes.body.user._id.toString();

  //     const savedEvent = await request(server)
  //       .post('/api/events')
  //       .set('Authorization', 'bearer ' + this.newUserRes.body.token)
  //       .send(testUtils.event);

  //     const res = await request(server)
  //       .post('/api/eventLikes')
  //       .set('Authorization', 'bearer ' + '1234')
  //       .send({ event_id: savedEvent.body._id });

  //     expect(res.status).to.be.eql(401);
  //     expect(res.body).to.have.property('message');
  //     expect(res.body.message).to.equal('jwt malformed');
  //   });

  //   it('should not create a EventLike document if event id does not exist', async () => {
  //     testUtils.event.creator = this.newUserRes.body.user._id.toString();

  //     const res = await request(server)
  //       .post('/api/eventLikes')
  //       .set('Authorization', 'bearer ' + this.newUserRes.body.token)
  //       .send({ event_id: '111111111111111111111111' });

  //     expect(res.status).to.be.eql(404);
  //     expect(res.body).to.have.property('message');
  //     expect(res.body.message).to.equal('Event with id 111111111111111111111111 does not exist.');
  //   });

  //   it('should not create an EventLike document if event id is invalid', async () => {
  //     testUtils.event.creator = this.newUserRes.body.user._id.toString();

  //     const res = await request(server)
  //       .post('/api/eventLikes')
  //       .set('Authorization', 'bearer ' + this.newUserRes.body.token)
  //       .send({ event_id: '1' });

  //     expect(res.status).to.be.eql(422);
  //     expect(res.body).to.have.property('message');
  //     expect(res.body.name).to.equal('CastError');
  //   });
  // });

  describe('DELETE eventLikes/:id', () => {

    it('should delete requested id and return response 200 with validated credentials', async () => {
      testUtils.event.creator = this.newUserRes.body.user._id.toString();

      // Create event without a EventLike document
      const newEvent = await db.Event.create(testUtils.event);

      // Add user to event
      const postRes = await request(server)
        .post('/api/eventLikes')
        .set('Authorization', 'bearer ' + this.newUserRes.body.token)
        .send({ event_id: newEvent._id.toString(), user_id: this.newUserRes.body.user._id.toString() });

      const res = await request(server)
        .delete('/api/eventLikes/' + postRes.body._id)
        .set('Authorization', 'bearer ' + this.newUserRes.body.token);

      expect(res.status).to.be.equal(200);
    });

    it('should NOT delete requested id and return response 200 with invalid credentials', async () => {
      testUtils.event.creator = this.newUserRes.body.user._id.toString();

      // Create event without a EventLike document
      const newEvent = await db.Event.create(testUtils.event);

      // Add user to event
      const postRes = await request(server)
        .post('/api/eventLikes')
        .set('Authorization', 'bearer ' + this.newUserRes.body.token)
        .send({ event_id: newEvent._id.toString(), user_id: this.newUserRes.body.user._id.toString() });

      const otherUser = await request(server)
        .post('/auth/signup')
        .send({
          first_name: 'first',
          last_name: 'last',
          password: '1234',
          email: 'otheruser@email.com'
        });

      const res = await request(server)
        .delete('/api/eventLikes/' + postRes.body._id)
        .set('Authorization', 'bearer ' + otherUser.body.token);

      expect(res.status).to.be.equal(422);
      expect(res.body.message).to.equal('You are not authorized to perform this action');
    });

    it('should delete all EventLike documents for deleted Event with field EventLike.event_id === Event._id , and return response 200', async () => {
      testUtils.event.creator = this.newUserRes.body.user._id.toString();

      const eventRes = await request(server)
        .post('/api/events')
        .set('Authorization', 'bearer ' + this.newUserRes.body.token)
        .send(testUtils.event);

      // Have other user like event
      await request(server)
        .post('/api/eventLikes')
        .set('Authorization', 'bearer ' + this.otherUserRes.body.token)
        .send({ event_id: eventRes.body._id.toString(), user_id: this.otherUserRes.body.user._id.toString() });

      const deleteRes = await request(server)
        .delete('/api/events/' + eventRes.body._id)
        .set('Authorization', 'bearer ' + this.newUserRes.body.token);

      const foundEventLikesRes = await request(server)
        .get(`/api/eventLikes/event/${eventRes.body._id.toString()}`);

      const eventLikeShouldNotExist = await db.EventLike.find({ event_id: eventRes.body._id, user_id: this.newUserRes.body.user._id.toString() });

      expect(deleteRes.status).to.be.equal(200);
      expect(foundEventLikesRes.body.length).to.be.equal(0);
      expect(eventLikeShouldNotExist.length).to.be.equal(0);
    });
  });

  describe('DELETE eventLikes/:user_id/:event_id', () => {

    it('should delete the EventLike Document and return response 200 with valid credentials', async () => {
      testUtils.event.creator = this.newUserRes.body.user._id.toString();

      const eventRes = await request(server)
        .post('/api/events')
        .set('Authorization', 'bearer ' + this.newUserRes.body.token)
        .send(testUtils.event);

      // Have user like the event
      await request(server)
        .post('/api/eventLikes')
        .set('Authorization', 'bearer ' + this.newUserRes.body.token)
        .send({ event_id: eventRes.body._id.toString() });

      const deleteRes = await request(server)
        .delete(`/api/eventLikes/${this.newUserRes.body.user._id.toString()}/${eventRes.body._id}`)
        .set('Authorization', 'bearer ' + this.newUserRes.body.token);

      expect(deleteRes.status).to.be.equal(200);
    });
  });
});
