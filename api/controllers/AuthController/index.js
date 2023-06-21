const { Request, Response } = require("express");
const User = require("../../models/User");
const Login = require("./Login");
const RegisterController = require("./RegisterController");

class AuthController {
  async login(req = Request, res = Response) {
    const loginController = new Login(User);
    await loginController.execute(req, res);
  }

  async register(req = Request, res = Response) {
    const registerController = new RegisterController(User);
    await registerController.execute(req, res);
  }
}

module.exports = AuthController;
