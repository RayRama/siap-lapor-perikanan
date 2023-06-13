class GetUser {
  constructor(User) {
    this.User = User;
  }

  async execute(req, res) {
    try {
      const user = await this.User.findById(req.params.id);
      const { password, ...others } = user._doc;

      res.status(200).json(others);
    } catch (error) {
      res.status(500).json({ error: error.message || error.toString() });
    }
  }
}

module.exports = GetUser;
