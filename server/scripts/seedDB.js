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

const assignUsersToEvents = async (tuple) => {
  const user = await db.User.findOne({ google_id: usersSeed[tuple[0]].google_id });
  const event = await db.Event.findOne({ title: eventsSeed[tuple[1]].title });

  const userEvent = new db.UserEvent({ user_id: user._id, event_id: event._id });
  await userEvent.save();
};

const populateDB = async () => {
  await utils.dropAllCollections();
  await db.User.collection.insertMany(usersSeed);

  await utils.asyncForEach(eventsSeed, async (item, index) => {
    const savedUser = await db.User.find({ google_id: usersSeed[index].google_id });
    const user = savedUser[0];
    const event = item;
    event.creator = user._id;
    try {
      await createEvent(event);
    } catch (err) {
      console.log(err);
    }
  });

  // Tuple indices represent: (user, event)
  await utils.asyncForEach([[0, 1], [0, 2], [1, 0], [3, 0]], async (tuple, index) => {
    console.log(index);
    await assignUsersToEvents(tuple);
  });

  // console.log(await db.Event.find({
  //   location: {
  //     $geoIntersects: { $geometry: seattle }
  //   }
  // }))

  process.exit(0);
};

populateDB();

