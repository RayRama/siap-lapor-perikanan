const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

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

const corsOptions = {
  origin: "http://localhost:3000", // Asal yang diizinkan (misalnya, klien pada port 3000)
  methods: ["GET", "POST", "PUT", "DELETE"], // Metode HTTP yang diizinkan
  allowedHeaders: ["Content-Type", "Authorization"], // Header yang diizinkan
  credentials: true, // Mengizinkan kredensial (misalnya, cookies, auth headers)
};

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const productionRoute = require("./routes/productions");
const fishRoute = require("./routes/fishs");
const productionContentRoute = require("./routes/productionContents");

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/productions", productionRoute);
app.use("/api/fishs", fishRoute);
app.use("/api/productionContents", productionContentRoute);

app.listen(8899, () => {
  console.log("Server is running on port 8899");
});
