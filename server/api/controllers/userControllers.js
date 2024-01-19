const JWT = require("jsonwebtoken");
const userData = require("../models/userDetails");
const { hashPassword, comparePassword } = require("../utils/authHelper");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

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

    // Hashing Password

    const hashedPassword = await hashPassword(password);

    const user = await userData({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();

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

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please enter email and password",
      });
    }
    const user = await userData.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }
    // Match Password
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid username or password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWTTOKEN, {
      expiresIn: "30d",
    });

    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
