import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO_URI; // Ensure this points to worksphere

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected to worksphere");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

export default connectDB;
