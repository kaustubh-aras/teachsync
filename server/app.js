require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./api/config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
connectDB();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Route for the root path
app.get("/", (req, res) => {
  res.send("Hi");
});

// Routes
const userRoutes = require("./api/routes/userRoutes");
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log("Server Connected");
  console.log(`Server is running on http://localhost:${PORT}`);
});
