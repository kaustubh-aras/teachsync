const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiration: {
      type: Date,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    dailyReports: [
      { type: mongoose.Schema.Types.ObjectId, ref: "DailyReport" },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
