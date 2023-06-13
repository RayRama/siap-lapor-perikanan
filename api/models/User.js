const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your username!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
