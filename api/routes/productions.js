const router = require("express").Router();
const verify = require("../verifyToken");
const ProductionControllers = require("../controllers/ProductionController");

const productionController = new ProductionControllers();

// Get all productions
router.get("/", verify, productionController.getAllProduction);

// Get a production
router.get("/find/:id", verify, productionController.getProduction);

// Create a production
router.post("/", verify, productionController.createProduction);

// Update a production
router.put("/:id", verify, productionController.updateProduction);

// Delete a production
router.delete("/:id", verify, productionController.deleteProduction);

// Get production report
router.get("/report", verify, productionController.getProductionReport);

module.exports = router;
