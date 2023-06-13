class GetFish {
  constructor(Fish) {
    this.Fish = Fish;
  }

  async execute(req, res) {
    try {
      const fish = await this.Fish.findById(req.params.id);
      res.status(200).json(fish);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = GetFish;
