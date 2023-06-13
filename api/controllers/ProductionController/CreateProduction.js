class CreateProduction {
  constructor(Production) {
    this.Production = Production;
  }

  async execute(req, res) {
    const production = new this.Production(req.body);
    try {
      const savedProduction = production.save();
      res.status(201).json(savedProduction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CreateProduction;
