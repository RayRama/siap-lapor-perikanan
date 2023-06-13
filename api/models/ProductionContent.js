const mongoose = require("mongoose");

const productionContentSchema = new mongoose.Schema(
  {
    fish_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fish",
      required: [true, "Please enter the fish id!"],
    },
    weight: {
      type: Number,
      required: [true, "Please enter the weight of the fish!"],
    },
    quantity: {
      type: Number,
      required: [true, "Please enter the quantity of the fish!"],
    },
  },
  {
    timestamps: true,
  }
);

const ProductionContent = mongoose.model(
  "ProductionContent",
  productionContentSchema
);
