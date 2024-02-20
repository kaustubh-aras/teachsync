const mongoose = require("mongoose");

const dailyReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serialNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    lectures: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    topics: {
      type: [String],
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DailyReport = mongoose.model("DailyReport", dailyReportSchema);

module.exports = { DailyReport };
