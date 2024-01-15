const express = require("express");
const { registerController } = require("../controllers/userControllers.js");

const router = express.Router();

router.post("/register", registerController);

router.get('/register', (req, res) => {
  res.send('Hi');
})

module.exports = router;
