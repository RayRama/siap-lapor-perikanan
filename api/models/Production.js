const mongoose = require("mongoose");

const productionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter the user id!"],
    },
    productionName: {
      type: String,
      required: [true, "Please enter the production name!"],
      unique: true,
    },
    productionContent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductionContent",
    },
    date: {
      type: Date,
      required: [true, "Please enter the date of production!"],
    },
  },
  {
    timestamps: true,
  }
);

const Production = mongoose.model("Production", productionSchema);
