import mongoose from "mongoose";

const database = async () => {
  try {
    const DATABASE = process.env.MONGO_URI;
    await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database.");
  } catch (error) {
    console.log("Could not connect to the database.", error);
  }
};

export default database;
