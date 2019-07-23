const db = require('../models');


module.exports = {
  dropAllCollections: async function () {
    await db.User.remove({});
    await db.Event.remove({});
    await db.UserEvent.remove({});
    await db.Comment.remove({});
  },

  asyncForEach: async function (array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index);
    }
  }

};
