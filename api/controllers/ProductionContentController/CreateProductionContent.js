class CreateProductionContent {
  constructor(ProductionContent) {
    this.ProductionContent = ProductionContent;
  }

  async execute(req, res) {
    const productionContent = new this.ProductionContent(req.body);
    try {
      const savedProductionContent = await productionContent.save();
      res.status(201).json(savedProductionContent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CreateProductionContent;
