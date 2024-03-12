const express = require("express");
const {
  registerController,
  loginController,
  updateProfileController,
  forgotPassword,
  resetPassword,
} = require("../controllers/userControllers.js");
const {
  dailyReportsController,
} = require("../controllers/dailyReportController.js");
const {
  requiresSignIn,
} = require("../middleware/tokenValidationMiddleware.js");

const {
  getDailyReportsController,
} = require("../controllers/dailyReportController.js");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.put("/update", requiresSignIn, updateProfileController);

router.post("/users/:userId/daily-reports", requiresSignIn, dailyReportsController);

router.get("/users/:userId/daily-reports", requiresSignIn, getDailyReportsController);

module.exports = router;
