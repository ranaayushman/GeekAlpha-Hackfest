require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // <- Import CORS
const userRouter = require("./routes/user.routes");
const investmentRoutes = require("./routes/investment.route");
const marketRoutes = require("./routes/market.route");

const app = express();

app.use(cors()); // <- Use CORS
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/market", marketRoutes);
app.use("/api/investments", investmentRoutes);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(8000, () => {
    console.log("listening on port 8000");
    console.log("connected to db");
  });
}

main();
