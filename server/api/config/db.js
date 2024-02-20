const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTIONSTRING);
    console.log("Database Connected");
  } catch (error) {
    console.log(`Error Connecting to DB ${error}`);
  }
};

module.exports = connectDB;