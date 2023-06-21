const router = require("express").Router();
const verify = require("../verifyToken");
const FishControllers = require("../controllers/FishController");

const fishController = new FishControllers();

// Get all fishs
router.get("/", verify, fishController.GetAllFish);

// Get a fish
router.get("/find/:id", verify, fishController.GetFish);

// Create a fish
router.post("/", verify, fishController.CreateFish);

// Update a fish
router.put("/:id", verify, fishController.UpdateFish);

// Delete a fish
router.delete("/:id", verify, fishController.DeleteFish);

module.exports = router;
