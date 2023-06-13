const router = require("express").Router();
const verify = require("../verifyToken");
const UserControllers = require("../controllers/UserController");

const userController = new UserControllers();

// Get all users
router.get("/", verify, userController.getAllUser);

// Get a user
router.get("/find/:id", verify, userController.getUser);

// Update a user
router.put("/:id", verify, userController.updateUser);

// Delete a user
router.delete("/:id", verify, userController.deleteUser);

module.exports = router;
