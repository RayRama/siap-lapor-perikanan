const router = require("express").Router();
const ProductionContentController = require("../controllers/ProductionContentController");
const verify = require("../verifyToken");
const productionContentController = new ProductionContentController();

// Create a productionContent
router.post("/", verify, productionContentController.CreateProductionContent);

// Get a productionContent
router.get(
  "/find/:id",
  verify,
  productionContentController.GetAllProductionContent
);

// Get all productionContents
router.get("/", verify, productionContentController.GetAllProductionContent);

module.exports = router;
