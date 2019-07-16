const router = require("express").Router();
const bookRoutes = require("./books");
// const userRoutes = require('./users');


// Book routes
router.use("/books", bookRoutes);

// // User routes
// router.use("/books", bookRoutes);

// router.use("/books", bookRoutes);

// router.use("/books", bookRoutes);

// router.use("/books", bookRoutes);


module.exports = router;
