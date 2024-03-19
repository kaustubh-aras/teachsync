const { User } = require("../models/userDetails");
const { DailyReport } = require("../models/userDailyReport");
const XLSX = require("xlsx");
const { v4: uuidv4 } = require("uuid");

const dailyReportsController = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a unique reportID
    const reportID = uuidv4();

    const newDailyReport = new DailyReport({
      reportID,
      user: userId,
      date: new Date(),
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
    let dailyReports = await DailyReport.find(query);

    // Format date before sending in the response
    dailyReports = dailyReports.map((report) => ({
      ...report.toObject(),
      date: `${report.date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })} ${report.date.toLocaleTimeString("en-IN", {
        hour12: true,
        timeZone: "Asia/Kolkata",
      })}`,
    }));
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

const deleteDailyReportController = async (req, res) => {
  const { userId, reportId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const dailyReport = await DailyReport.findById(reportId);
    if (!dailyReport || dailyReport.user.toString() !== userId) {
      return res
        .status(404)
        .json({ error: "Daily report not found for this user" });
    }

    await DailyReport.findByIdAndDelete(reportId);
    user.dailyReports.pull(reportId);
    await user.save();

    res.status(200).json({ message: "Daily report deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const downloadDailyReportsController = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    const dailyReports = await DailyReport.find({ user: userId });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const data = [
      [
        "Report ID",
        "Date",
        "Lectures",
        "Subject",
        "Topics",
        "Course",
        "Division",
      ],
      ...dailyReports.map((report) => [
        report.reportID,
        `${report.date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })} ${report.date.toLocaleTimeString("en-IN")}`,
        report.lectures,
        report.subject,
        report.topics.join(", "),
        report.course,
        report.division,
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DailyReport");

    // Set the response headers for Excel download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=daily_reports.xlsx"
    );

    // Convert the workbook to a buffer and send the response
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
    res.status(200).send(excelBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  dailyReportsController,
  getDailyReportsController,
  downloadDailyReportsController,
  deleteDailyReportController,
};
