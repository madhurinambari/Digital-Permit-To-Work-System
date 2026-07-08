const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const permitRoutes = require("./routes/permitRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/user", userRoutes);

app.use("/api/permits", permitRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "Backend Working" });
});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("PTW Backend API Running Successfully 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});