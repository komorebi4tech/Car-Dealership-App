import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    make: String,
    model: String,
    year: Number,
    price: Number,
    mileage: Number,

    bodyStyle: String,
    driveType: String,
    transmission: String,
    engine: String,
    fuel: String,

    exteriorColor: String,
    interiorColors: [String],

    seatHeat: String,
    vin: String,
    description: String,
    photos: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Car || mongoose.model("Car", CarSchema);