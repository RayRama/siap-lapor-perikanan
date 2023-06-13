class UpdateFish {
  constructor(Fish) {
    this.Fish = Fish;
  }

  async execute(req, res) {
    if (req.user.isAdmin) {
      try {
        const updatedFish = await this.Fish.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedFish);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }
}

module.exports = UpdateFish;
