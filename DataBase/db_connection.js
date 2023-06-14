import mongoose from "mongoose";
import {} from "dotenv/config.js";

export async function dbConnection() {
  const params = { useNewUrlParser: true, useUnifiedTopology: true };
  await mongoose.connect(process.env.DB_URL, params);
  console.log("DB Connected")
}
