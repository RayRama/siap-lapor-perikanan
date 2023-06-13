const { Request, Response } = require("express");
const User = require("../../models/User");
const GetUser = require("./GetUser");
const GetAllUser = require("./GetAllUser");
const UpdateUser = require("./UpdateUser");
const DeleteUser = require("./DeleteUser");

class UserController {
  async getUser(req = Request, res = Response) {
    const getUser = new GetUser(User);
    await getUser.execute(req, res);
  }

  async getAllUser(req = Request, res = Response) {
    const getAllUser = new GetAllUser(User);
    await getAllUser.execute(req, res);
  }

  async updateUser(req = Request, res = Response) {
    const updateUser = new UpdateUser(User);
    await updateUser.execute(req, res);
  }

  async deleteUser(req = Request, res = Response) {
    const deleteUser = new DeleteUser(User);
    await deleteUser.execute(req, res);
  }
}

module.exports = UserController;
