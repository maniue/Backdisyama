"use strict";

var mongoose = require("mongoose");

async function connectionDB() {
  try {
    const dbUri = "mongodb://localhost:27017/disyama";
    await mongoose.connect(dbUri);
    console.info("DB Connected");
  } catch (error) {
    console.info("Could not connect to DB");
    process.exit(1);
  }
}

module.exports = {
    connectionDB
}