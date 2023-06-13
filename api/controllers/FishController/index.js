const { Request, Response } = require("express");
const Fish = require("../../models/Fish");
const CreateFish = require("./CreateFish");
const GetFish = require("./GetFish");
const GetAllFish = require("./GetAllFish");
const UpdateFish = require("./UpdateFish");
const DeleteFish = require("./DeleteFish");

class FishController {
  async CreateFish(req = Request, res = Response) {
    const createFish = new CreateFish(Fish);
    await createFish.execute(req, res);
  }

  async GetFish(req = Request, res = Response) {
    const getFish = new GetFish(Fish);
    await getFish.execute(req, res);
  }

  async GetAllFish(req = Request, res = Response) {
    const getAllFish = new GetAllFish(Fish);
    await getAllFish.execute(req, res);
  }

  async UpdateFish(req = Request, res = Response) {
    const updateFish = new UpdateFish(Fish);
    await updateFish.execute(req, res);
  }

  async DeleteFish(req = Request, res = Response) {
    const deleteFish = new DeleteFish(Fish);
    await deleteFish.execute(req, res);
  }
}

module.exports = FishController;
