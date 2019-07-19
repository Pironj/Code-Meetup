const mongoose = require('mongoose');
const db = require('../models');

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

const userSeed = [
  {
    google_id: '0234',
  },
  {
    google_id: '5678',
  },
  {
    google_id: '9101',
  },
  {
    google_id: '1213',
  },
  {
    google_id: '1415',
  },
  {
    google_id: '1617',
  }
];

const eventSeed = [
  {
    'title': 'Interview Questions', // 0234
    'description': 'Practice interviewQuestions',
  },
  {
    'title': 'Study Time!', // 5678
    'description': 'Time to work on projects.',
  },
  {
    'title': 'Interview a dev', // 9101
    'description': 'Get some insight in the industry',
  }
];

createEvent = async (body) =>{
  const event = await db.Event.create(body);
  await db.UserEvent.create({user_id: event.creator, event_id: event._id});
};

// const assignUsersToEvents = async (tuple) => {
//   const user = await db.User.findOne({ google_id: userSeed[tuple[0]].google_id });
//   const event = await db.Event.findOne({ title: eventSeed[tuple[1]].title });

//   const userEvent = new db.UserEvent({ user_id: user._id, event_id: event._id });
//   await userEvent.save();
// };

const populateDB = async () => {
  await db.User.remove({});
  await db.Event.remove({});
  await db.UserEvent.remove({});
  await db.User.collection.insertMany(userSeed);

  await asyncForEach(eventSeed, async (item, index) => {
    const savedUser = await db.User.find({ google_id: userSeed[index].google_id });
    user = savedUser[0];
    const event = item;
    event.creator = user._id;
    await createEvent(event);
    // savedEvent = new db.Event(event);
    // await savedEvent.save();
    // const userEvent = new db.UserEvent({ user_id: user._id, event_id: savedEvent._id });
    // await userEvent.save();
  });

  // Tuple indices represent: (user, event)
  await asyncForEach([[0, 1], [0, 2], [1, 0], [3, 0]], async (tuple, index) => {
    console.log(index);
    await assignUsersToEvents(tuple);
  });

  process.exit(0);
};

populateDB();

