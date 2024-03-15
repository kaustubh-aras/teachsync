const mongoose = require("mongoose");

const dailyReportSchema = new mongoose.Schema(
  {
    reportID: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

// Add an index on the user field
dailyReportSchema.index({ user: 1 });

const DailyReport = mongoose.model("DailyReport", dailyReportSchema);

module.exports = { DailyReport };
