import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
  mileage: Number,
});

export default mongoose.models.Car || mongoose.model("Car", CarSchema);