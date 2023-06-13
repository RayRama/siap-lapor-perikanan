const CryptoJS = require("crypto-js");

class UpdateUser {
  constructor(User) {
    this.User = User;
  }

  async execute(req, res) {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString();
      }
      try {
        const updatedUser = await this.User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }
}

module.exports = UpdateUser;
