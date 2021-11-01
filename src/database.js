const mongoose = require('mongoose');
require('dotenv');

(async () => {
  try {
    const mongooseOptions = {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD
    }
    const db = await mongoose.connect(process.env.MONGODB_URI ||`mongodb://localhost/gamesDB`);
    console.log("Database is Connected", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
