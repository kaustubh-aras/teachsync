const { User } = require("../models/userDetails");
const { DailyReport } = require("../models/userDailyReport");

const dailyReportsController = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newDailyReport = new DailyReport({
      user: userId,
      ...req.body,
    });

    // Save the new daily report to the database
    const savedReport = await newDailyReport.save();
    user.dailyReports.push(savedReport._id);
    await user.save();
    // Respond with the saved daily report
    res.status(201).json(savedReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDailyReportsController = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    const { course } = req.query;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Query based on the presense of the course parameters
    const query = { user: userId };
    if (course) {
      query.course = course;
    }

    // Fetch daily reports for the user
    const dailyReports = await DailyReport.find(query);

    // Calculate total sum of lectures
    const totalLectures = dailyReports.reduce(
      (sum, report) => sum + report.lectures,
      0
    );

    // Respond with the fetched daily reports
    res.status(200).json({ dailyReports, totalLectures });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { dailyReportsController, getDailyReportsController };
