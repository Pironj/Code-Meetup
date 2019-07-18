// const mongoose = require('mongoose');
// const db = require('../models');

// // This file empties the Books collection and inserts the books below

// mongoose.connect(
//   process.env.MONGODB_URI ||
//   'mongodb://localhost/codemeetup'
// );

// async function asyncForEach(array, callback) {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index]);
//   }
// };

// async function createCategoryDocuments() {
//   await asyncForEach(Array.from(categories), async (item) => {
//     const possibleExistingCategory = await Category.findOne({ category: item });
//     if (!possibleExistingCategory) {
//       const category = new Category({ category: item });
//       await category.save();
//       console.log(category);
//     }
//   });
//   mongoose.connection.close();

// };

// const userSeed = [
//   {
//     google_id: '0234',
//   },
//   {
//     google_id: '5678',
//   },
//   {
//     google_id: '9101',
//   },
//   {
//     google_id: '1213',
//   }
// ];

// const eventSeed = [
//   {
//     'title': 'Interview Questions', // 0234
//     'description': 'Practice interviewQuestions',
//   },
//   {
//     'title': 'Study Time!', // 5678
//     'description': 'Time to work on projects.',
//   },
//   {
//     'title': 'Interview a dev', // 9101
//     'description': 'Get some insight in the industry',
//   }
// ];

// db.User
//   // .remove({})
//   .remove({ _id: { $ne: "5d2e6d976ef33530b82bbaf4" } })
//   .then(() => db.User.collection.insertMany(userSeed))
//   .then(async data => {
//     console.log(data.result.n + ' user records inserted!');
//     for (let i = 0; i < eventSeed.length; i++) {
//       db.User.find({ google_id: userSeed[i] })
//         .then(user => {
//           eventSeed.user = user._id;
//           eventSeed[i].save();
//         });
//     }

//     await asyncForEach(Array.from(categories), async (item) => {
//       const possibleExistingCategory = await Category.findOne({ category: item });
//       if (!possibleExistingCategory) {
//         const category = new Category({ category: item });
//         await category.save();
//         console.log(category);
//       }
//     });

//     // process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
