const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

const mongoUrl =
"mongodb+srv://kaustubhrx:smhi5syncmax1511@cluster0.zgwhhu3.mongodb.net/?retryWrites=true&w=majority";

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

  const oldUser = await user.findOne({email:email});

  if (oldUser) {
    return res.send({data:"Email already exist!"});
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

app.listen(PORT, () => {
  console.log("Server Connected");
  console.log(`Server is running on http://localhost:${PORT}`);
});
