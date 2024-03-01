const express = require("express");
const {
  registerController,
  loginController,
  updateProfileController,
} = require("../controllers/userControllers.js");
const dailyReportsController = require("../controllers/dailyReportController.js");
const {
  requiresSignIn,
} = require("../middleware/tokenValidationMiddleware.js");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.put("/update", requiresSignIn, updateProfileController);

router.post("/users/:userId/daily-reports", dailyReportsController);

module.exports = router;