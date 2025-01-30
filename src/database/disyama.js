"use strict";

var mongoose = require("mongoose");



async function connectionDB() {
  try {
    const dbUri = process.env.MONGODB_URI;
    console.log(dbUri)
    if (!dbUri) {
      throw new Error('MONGODB_URI no está definida');
    }

    await mongoose.connect(dbUri);
    console.info("DB Connected");
  } catch (error) {
    console.error("Could not connect to DB:", error);
    process.exit(1);
  }
}

module.exports = { connectionDB };


module.exports = {
  connectionDB
};
