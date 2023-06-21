class GetProductionContent {
  constructor(ProductionContent) {
    this.ProductionContent = ProductionContent;
  }

  async execute(req, res) {
    try {
      const productionContent = await this.ProductionContent.findById(
        req.params.id
      );
      res.status(200).json(productionContent);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = GetProductionContent;
