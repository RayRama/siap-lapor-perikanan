const mongoose = require("mongoose");

const fishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name of the fish!"],
      unique: true,
    },
    image: {
      type: String,
      required: [true, "Please enter the url image of the fish!"],
    },
  },
  {
    timestamps: true,
  }
);

const Fish = mongoose.model("Fish", fishSchema);
