class DeleteProduction {
  constructor(Production) {
    this.Production = Production;
  }

  async execute(req, res) {
    try {
      await this.Production.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: `Production with id ${req.params.id} was deleted.` });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = DeleteProduction;
