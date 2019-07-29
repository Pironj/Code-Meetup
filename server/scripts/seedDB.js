/**
 * This file empties all collections and populates DB
 **/

const mongoose = require('mongoose');

const db = require('../models');
const usersSeed = require('./usersSeed.json');
const eventsSeed = require('./eventsSeed.json');
const utils = require('./utils');


mongoose.connect(
  process.env.MONGODB_URI ||
  'mongodb://localhost/codemeetup'
);

createEvent = async (body) => {
  const event = await db.Event.create(body);
  await db.UserEvent.create({ user_id: event.creator, event_id: event._id });
};

const assignUsersToEvents = async (user, index) => {
  const event = await db.Event.findOne({ title: eventsSeed[index].title });

  const userEvent = new db.UserEvent({ user_id: user._id, event_id: event._id });
  await userEvent.save();
};

const populateDB = async () => {
  await utils.dropAllCollections();

  // Add all users
  await utils.asyncForEach(usersSeed, async (item, index) => {
    console.log(index);
    try {
      await db.User.create(item);
    } catch (err) {
      console.log(err);
    }
  });

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

  // Tuple indices represent: (user, event)
  await utils.asyncForEach(savedUsers, async (user, index) => {
    await assignUsersToEvents(user, 5 - index);
  });

  process.exit(0);
};

populateDB();

