class GetProductionReport {
  constructor(Production) {
    this.Production = Production;
  }

  async execute(req, res) {
    // get data from database based on month, year, or date params using aggregate
    const { month, year, date } = req.query;
    let production;

    try {
      if (month && year) {
        production = await this.Production.aggregate([
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: [{ $month: "$date" }, parseInt(month)] },
                  { $eq: [{ $year: "$date" }, parseInt(year)] },
                ],
              },
            },
          },
          {
            $group: {
              _id: { $dayOfMonth: "$date" },
              total: { $sum: "$total" },
            },
          },
        ]);
      } else if (date) {
        production = await this.Production.aggregate([
          {
            $match: {
              $expr: {
                $eq: [
                  { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                  date,
                ],
              },
            },
          },
          {
            $group: {
              _id: { $hour: "$date" },
              total: { $sum: "$total" },
            },
          },
        ]);
      } else {
        production = await this.Production.aggregate([
          {
            $group: {
              _id: { $month: "$date" },
              total: { $sum: "$total" },
            },
          },
        ]);
      }

      res.status(200).json(production);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = GetProductionReport;
