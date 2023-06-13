const { Request, Response } = require("express");
const User = require("../../models/User");
const Login = require("./Login");
const Register = require("./Register");

class AuthController {
  async login(req = Request, res = Response) {
    const loginController = new Login(User);
    await loginController.execute(req, res);
  }

  async register(req = Request, res = Response) {
    const registerController = new Register(User);
    await registerController.execute(req, res);
  }
}

module.exports = AuthController;
