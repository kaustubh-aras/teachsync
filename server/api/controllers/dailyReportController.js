const { User } = require("../models/userDetails");
const { DailyReport } = require("../models/userDailyReport");

const dailyReportsController = async (req, res) => {
  try {
    const userId = req.params.userId;

    console.log("userId:", userId);
    console.log("req.body:", req.body);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newDailyReport = new DailyReport({
      user: userId,
      ...req.body,
    });

    // Save the new daily report to the database
    const savedDailyReport = await newDailyReport.save();

    // Respond with the saved daily report
    res.status(201).json(savedDailyReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = dailyReportsController;
