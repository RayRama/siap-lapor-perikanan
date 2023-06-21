const CryptoJS = require("crypto-js");

class RegisterController {
  constructor(User) {
    this.User = User;
  }

  async execute(req, res) {
    // check req body username, email, password min length
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({
        error: "Username, email and password are required!",
      });
    }

    if (
      req.body.username.length < 3 ||
      req.body.email.length < 6 ||
      req.body.password.length < 6
    ) {
      return res.status(400).json({
        error:
          "Username, email and password must be at least 3, 6 and 6 characters long!",
      });
    }

    const newUser = new this.User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });
    try {
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = RegisterController;
