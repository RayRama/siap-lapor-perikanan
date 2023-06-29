class GetAllProduction {
  constructor(Production) {
    this.Production = Production;
  }

  async execute(req, res) {
    try {
      // create pagination with limit 10 items per page
      const limit = parseInt(req.query.limit) || 20;
      const page = parseInt(req.query.page) || 1;

      const production = await this.Production.find()
        .populate("user_id")
        .populate({
          path: "productionContent",
          populate: {
            path: "fish_id",
            model: "Fish",
          },
        })
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();

      const count = await this.Production.countDocuments();

      res.status(200).json({
        data: production,
        total_page: Math.ceil(count / limit),
        current_page: page,
      });
      // const production = await this.Production.find().populate("user_id");
      // res.status(200).json(production);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = GetAllProduction;
