const axios = require('axios');
const router = require('express').Router();
const userController = require('../../controllers/userController');
const auth = require('../../controllers/authController');


// // Matches with "/api/users"
router.route('/')
  .get(userController.findAll);

// // Matches with "/api/users/:id"
router.route('/:id')
  .get(userController.findById) // to protect in auth.authorizeUserParams
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
