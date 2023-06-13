const { Request, Response } = require("express");
const Production = require("../../models/Production");
const CreateProduction = require("./CreateProduction");
const DeleteProduction = require("./DeleteProduction");
const GetAllProduction = require("./GetAllProduction");
const GetProduction = require("./GetProduction");
const UpdateProduction = require("./UpdateProduction");
const GetProductionReport = require("./GetProductionReport");

class ProductionController {
  async createProduction(req = Request, res = Response) {
    const createProduction = new CreateProduction(Production);
    await createProduction.execute(req, res);
  }

  async deleteProduction(req = Request, res = Response) {
    const deleteProduction = new DeleteProduction(Production);
    await deleteProduction.execute(req, res);
  }

  async getAllProduction(req = Request, res = Response) {
    const getAllProduction = new GetAllProduction(Production);
    await getAllProduction.execute(req, res);
  }

  async getProduction(req = Request, res = Response) {
    const getProduction = new GetProduction(Production);
    await getProduction.execute(req, res);
  }

  async updateProduction(req = Request, res = Response) {
    const updateProduction = new UpdateProduction(Production);
    await updateProduction.execute(req, res);
  }

  async getProductionReport(req = Request, res = Response) {
    const getProductionReport = new GetProductionReport(Production);
    await getProductionReport.execute(req, res);
  }
}

module.exports = ProductionController;
