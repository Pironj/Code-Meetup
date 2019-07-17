const router = require("express").Router();
const userEventController = require("../../controllers/userEventController");

// // Matches with "/api/books"
router.route("/")
  .get(userEventController.findAll)
  .post(userEventController.create);

router.route('/user/:user_id')
  .get(userEventController.findByUserId)

  router.route('/event/:event_id')
  .get(userEventController.findByEventId)

// // Matches with "/api/books/:id"
// router.route("/:id")
//   .get(userEventController.findById)
//   .put(userEventController.update)
//   .delete(userEventController.remove);

// router.route("/:id/addAttendee")
//   .put(userEventController.addAttendee)

module.exports = router;
