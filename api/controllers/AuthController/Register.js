const CryptoJS = require("crypto-js");

class Register {
  constructor(User) {
    this.User = User;
  }

  async execute(req, res) {
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

module.exports = Register;
