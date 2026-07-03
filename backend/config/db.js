import mongoose from "mongoose";

const mongodb_url = process.env.mongodb_url
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("DB Connected");
  } catch (error) {
    console.error("MongoDB Error:", error);
  }
};