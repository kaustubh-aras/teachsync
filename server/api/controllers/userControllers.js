const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/authHelper");
const { User } = require("../models/userDetails");
const shortid = require("shortid"); // Import shortid for generating unique IDs
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Controller for handling user registration
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validation checks for required fields
    if (!name || !email || !password || password.length < 8 || !phone) {
      return res.status(400).send({
        success: false,
        message: "Invalid input. Please provide all required fields.",
      });
    }

    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Email ID already registered",
      });
    }

    // Generate a unique userID using shortid
    const userID = shortid.generate();

    // Hashing Password
    const hashedPassword = await hashPassword(password);

    // Save user details to the database
    const user = await User({
      userID,
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "Registration Completed",
      user: {
        userID: user.userID,
        name: user.name,
        email: user.email,
      },
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

// Controller for handling user login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation checks for required fields
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please enter email and password",
      });
    }

    // Check if the user with the given email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User Not Found",
      });
    }

    // Match Password
    const matchPassword = await comparePassword(password, user.password);

    if (!matchPassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = JWT.sign(
      { email: user.email, id: user._id },
      process.env.JWTTOKEN,
      { expiresIn: "30d" }
    );

    // Remove password from the user object before sending the response
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

// Controller for updating user profile
const updateProfileController = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    // user find
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (password && password.length < 8) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be 6 characters long",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    // Updated User
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        phone: phone || user.phone,
        password: hashedPassword || user.password,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).send({
        success: false,
        message: "Error updating user profile",
      });
    }

    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile Updated",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in Profile Update API",
    });
  }
};

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const generateOTP = () => {
  // Generate a random 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = generateOTP();
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 3600000; // OTP expires in 1 hour

    await user.save();

    // Send password reset email with the token link
    const mailOptions = {
      from: 'TeachSync',
      to: user.email,
      subject: "Password Reset",
      text: `Your OTP for password reset is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({
      message: "OTP sent successfully",
      resetToken: user.resetPasswordOTP,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided OTP matches the stored OTP
    if (user.resetPasswordOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if the reset token is not expired
    if (Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({ message: "Reset token has expired" });
    }

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Update the user's password
    user.password = await hashPassword(newPassword);
    // Reset OTP and expiry to null after successful password reset
    user.resetPasswordOTP = null;
    user.resetPasswordExpires = null;

    // Save the updated user details
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Exporting the controllers for use in other files
module.exports = {
  registerController,
  loginController,
  updateProfileController,
  forgotPassword,
  resetPassword,
};
