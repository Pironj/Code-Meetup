const mongoose = require('mongoose');

const db = require('../models');
const userSeed = require('./usersSeed.json');
const eventsSeed = require('./eventsSeed.json');
// This file empties the all collections and populates DB

mongoose.connect(
  process.env.MONGODB_URI ||
  'mongodb://localhost/codemeetup'
);

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}

createEvent = async (body) =>{
  const event = await db.Event.create(body);
  await db.UserEvent.create({user_id: event.creator, event_id: event._id});
};

const assignUsersToEvents = async (tuple) => {
  const user = await db.User.findOne({ google_id: userSeed[tuple[0]].google_id });
  const event = await db.Event.findOne({ title: eventsSeed[tuple[1]].title });

  const userEvent = new db.UserEvent({ user_id: user._id, event_id: event._id });
  await userEvent.save();
};

const populateDB = async () => {
  await db.User.remove({});
  await db.Event.remove({});
  await db.UserEvent.remove({});
  await db.User.collection.insertMany(userSeed);

  await asyncForEach(eventsSeed, async (item, index) => {
    const savedUser = await db.User.find({ google_id: userSeed[index].google_id });
    user = savedUser[0];
    const event = item;
    event.creator = user._id;
    await createEvent(event);
  });

  // Tuple indices represent: (user, event)
  await asyncForEach([[0, 1], [0, 2], [1, 0], [3, 0]], async (tuple, index) => {
    console.log(index);
    await assignUsersToEvents(tuple);
  });

  process.exit(0);
};

populateDB();

