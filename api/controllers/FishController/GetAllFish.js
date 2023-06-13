class GetAllFish {
  constructor(Fish) {
    this.Fish = Fish;
  }

  async execute(req, res) {
    // create pagination with limit 10 items per page
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const query = req.query.new;

    if (req.user.isAdmin) {
      try {
        const fish = query
          ? await this.Fish.find().sort({ _id: -1 }).limit(5)
          : await this.Fish.find()
              .limit(limit)
              .skip((page - 1) * limit)
              .exec();

        const count = await this.Fish.countDocuments();

        res.status(200).json({
          data: fish,
          total_page: Math.ceil(count / limit),
          current_page: page,
        });
      } catch (error) {}
    } else {
      res.status(403).json({ error: "You are not allowed to see all fish!" });
    }
  }
}

module.exports = GetAllFish;
