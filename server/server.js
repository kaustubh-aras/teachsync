require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT =  process.env.PORT || 3000;
const mongoUrl = process.env.CONNECTIONSTRING;
const JWT_SECRET = process.env.PUBLICKEY;

app.use(express.json());

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })

  .catch((e) => {
    console.log(e);
  });

require("./api/models/userDetails");

const user = mongoose.model("Users");

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

app.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;
  console.log(req.body);

  const oldUser = await user.findOne({ email: email });

  if (oldUser) {
    return res.send({ data: "Email already exist!" });
  }

  try {
    await user.create({
      name: name,
      email: email,
      password: password,
      phone: phone,
    });
    res.send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.send({ staus: "error", data: error });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const oldUser = await user.findOne({ email: email });

  if (!oldUser) {
    return res.send({ data: "User does not exist!" });
  }

  if (await (password, oldUser.password)) {
    const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.send({ staus: "ok", data: token });
    } else {
      return res.send({ error: "error" });
    }
  }
});

app.listen(PORT, () => {
  console.log("Server Connected");
  console.log(`Server is running on http://localhost:${PORT}`);
});
