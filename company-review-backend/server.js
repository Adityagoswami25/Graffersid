const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

const companyRoutes = require("./routes/companyRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/api/companies", companyRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
