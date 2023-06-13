class DeleteFish {
  constructor(Fish) {
    this.Fish = Fish;
  }

  async execute(req, res) {
    if (req.user.isAdmin) {
      try {
        await this.Fish.findByIdAndDelete(req.params.id);
        res.status(200).json("Fish has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can delete only your account!");
    }
  }
}

module.exports = DeleteFish;
