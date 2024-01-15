const userData = require("../models/userDetails");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    console.log(req.body); //remove this later

    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is Required",
      });
    }

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is Required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Password is Required",
      });
    }

    if (password.length < 8) {
      return res.status(400).send({
        success: false,
        message: "Password should 8 character long",
      });
    }

    if (!phone) {
      return res.status(400).send({
        success: false,
        message: "Phone is Required",
      });
    }

    const existingUser = await userData.findOne({ email: email });

    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Email ID already registered",
      });
    }

    const user = await userData({ name, email, phone, password }).save();

    res.status(201).send({
      success: true,
      message: "Registration Completed",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Registration API",
      error,
    });
  }
};

module.exports = { registerController };
