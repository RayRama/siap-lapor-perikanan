const router = require("express").Router();
const verify = require("../verifyToken");
const FishControllers = require("../controllers/FishController");

const fishController = new FishControllers();

// Get all fishs
router.get("/", verify, fishController.getAllFish);

// Get a fish
router.get("/find/:id", verify, fishController.getFish);

// Create a fish
router.post("/", verify, fishController.createFish);

// Update a fish
router.put("/:id", verify, fishController.updateFish);

// Delete a fish
router.delete("/:id", verify, fishController.deleteFish);

module.exports = router;
