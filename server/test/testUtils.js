const asyncForEach = require('../scripts/utils').asyncForEach;
const db = require('../models');

module.exports = {
  event: {
    title: 'Test title',
    description: 'Test Description',
    creator: '',
  },

  user: {
    first_name: 'first',
    last_name: 'last',
    // picture: 'pictureUrl',
    password: '1234',
    email: 'user@email.com'
  },

  seedUsers: async (usersSeed) => {
    await asyncForEach(usersSeed, async (item, index) => {
      console.log(index);
      try {
        await db.User.create(item);
      } catch (err) {
        console.log(err);
      }
    })
  },

}
