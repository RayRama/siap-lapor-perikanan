class GetProduction {
  constructor(Production) {
    this.Production = Production;
  }

  async execute(req, res) {
    try {
      const production = await this.Production.findById(req.params.id);
      res.status(200).json(production);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = GetProduction;
