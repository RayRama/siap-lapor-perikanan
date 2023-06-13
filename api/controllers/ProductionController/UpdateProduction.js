class UpdateProduction {
  constructor(Production) {
    this.Production = Production;
  }

  async execute(req, res) {
    try {
      const production = await this.Production.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(production);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UpdateProduction;
