class GetAllUser {
  constructor(User) {
    this.User = User;
  }

  async execute(req, res) {
    const query = req.query.new;

    if (req.user.isAdmin) {
      try {
        const users = query
          ? await this.User.find().sort({ _id: -1 }).limit(5)
          : await this.User.find();

        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: error.message || error.toString() });
      }
    } else {
      res.status(403).json({ error: "You are not allowed to see all users!" });
    }
  }
}

module.exports = GetAllUser;
