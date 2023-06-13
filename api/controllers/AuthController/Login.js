const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

class Login {
  constructor(User) {
    this.User = User;
  }

  async execute(req, res) {
    try {
      const user = await this.User.findOne({ username: req.body.username });
      if (!user)
        return res.status(401).json("Username or password is incorrect");

      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== req.body.password)
        return res.status(401).json("Username or password is incorrect");

      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );

      const { password, ...info } = user._doc;

      res.status(200).json({ ...info, accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = Login;
