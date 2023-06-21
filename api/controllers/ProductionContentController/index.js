const { Request, Response } = require("express");
const ProductionContent = require("../../models/ProductionContent");
const CreateProductionContent = require("./CreateProductionContent");
const GetProductionContent = require("./GetProductionContent");
const GetAllProductionContent = require("./GetAllProductionContent");

class ProductionContentController {
  async CreateProductionContent(req = Request, res = Response) {
    const createProductionContent = new CreateProductionContent(
      ProductionContent
    );
    await createProductionContent.execute(req, res);
  }

  async GetProductionContent(req = Request, res = Response) {
    const getProductionContent = new GetProductionContent(ProductionContent);
    await getProductionContent.execute(req, res);
  }

  async GetAllProductionContent(req = Request, res = Response) {
    const getAllProductionContent = new GetAllProductionContent(
      ProductionContent
    );
    await getAllProductionContent.execute(req, res);
  }
}

module.exports = ProductionContentController;
