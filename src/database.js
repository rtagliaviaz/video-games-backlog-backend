// `mongodb://localhost/gamesDB`


const mongoose = require('mongoose');
require('dotenv');

(async () => {
  try {
    const mongooseOptions = {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD
    }
    const db = await mongoose.connect(process.env.MONGODB_URI ||`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@devcluster.s8bmw.mongodb.net/gamesDB?retryWrites=true&w=majority`);
    
    console.log("Database is Connected", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
