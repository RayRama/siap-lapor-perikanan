const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

// Middleware
app.use(express.json());

// Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const productionRoute = require("./routes/productions");
const fishRoute = require("./routes/fishs");

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/productions", productionRoute);
app.use("/api/fishs", fishRoute);

app.listen(8899, () => {
  console.log("Server is running on port 8899");
});
