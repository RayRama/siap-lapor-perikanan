class CreateFish {
  constructor(Fish) {
    this.Fish = Fish;
  }

  async execute(req, res) {
    if (req.user.isAdmin) {
      const newFish = new this.Fish(req.body);
      try {
        const savedFish = await newFish.save();
        res.status(201).json(savedFish);
      } catch (error) {
        res.status(500).json({ error: error.message || error.toString() });
      }
    }
  }
}

module.exports = CreateFish;
