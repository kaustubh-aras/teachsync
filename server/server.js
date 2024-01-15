require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("cors");

const connectDB = require("./api/config/db");

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.CONNECTIONSTRING;
const JWT_SECRET = process.env.PUBLICKEY;

// MongoDB Connection
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes

app.use("/api/v1/auth", require("./api/routes/userRoutes"));

app.listen(PORT, () => {
  console.log("Server Connected");
  console.log(`Server is running on http://localhost:${PORT}`);
});
