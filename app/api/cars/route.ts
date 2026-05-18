import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/* =========================
   GET ALL CARS
========================= */
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const cars = await db.collection("cars").find().toArray();

    return Response.json(cars);
  } catch (error) {
    console.error("GET cars error:", error);
    return Response.json({ error: "Failed to fetch cars" }, { status: 500 });
  }
}

/* =========================
   ADD CAR
========================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newCar = {
      make: body.make || "",
      model: body.model || "",
      year: Number(body.year),
      price: Number(body.price),
      mileage: Number(body.mileage),

      bodyStyle: body.bodyStyle || "",
      driveType: body.driveType || "",
      exteriorColor: body.exteriorColor || "",
      interiorColors: Array.isArray(body.interiorColors)
        ? body.interiorColors
        : [],
      transmission: body.transmission || "",
      engine: body.engine || "",
      fuel: body.fuel || "",
      seatHeat: body.seatHeat || "",

      vin: body.vin || "",
      description: body.description || "",
      photos: Array.isArray(body.photos) ? body.photos : [],

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("test");

    const result = await db.collection("cars").insertOne(newCar);

    return Response.json({
      ...newCar,
      _id: result.insertedId,
    });
  } catch (error) {
    console.error("POST car error:", error);
    return Response.json({ error: "Failed to add car" }, { status: 500 });
  }
}

/* =========================
   DELETE CAR
========================= */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id || !ObjectId.isValid(id)) {
      return Response.json({ error: "Invalid car ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("test");

    const result = await db.collection("cars").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return Response.json({ error: "Car not found" }, { status: 404 });
    }

    return Response.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("DELETE car error:", error);
    return Response.json({ error: "Failed to delete car" }, { status: 500 });
  }
}

/* =========================
   UPDATE CAR
========================= */
export async function PUT(req: Request) {
  try {
    const { id, ...body } = await req.json();

    if (!id || !ObjectId.isValid(id)) {
      return Response.json({ error: "Invalid car ID" }, { status: 400 });
    }

    const updateData = {
      make: body.make || "",
      model: body.model || "",
      year: Number(body.year),
      price: Number(body.price),
      mileage: Number(body.mileage),

      bodyStyle: body.bodyStyle || "",
      driveType: body.driveType || "",
      exteriorColor: body.exteriorColor || "",
      interiorColors: Array.isArray(body.interiorColors)
        ? body.interiorColors
        : [],
      transmission: body.transmission || "",
      engine: body.engine || "",
      fuel: body.fuel || "",
      seatHeat: body.seatHeat || "",

      vin: body.vin || "",
      description: body.description || "",
      photos: Array.isArray(body.photos) ? body.photos : [],

      updatedAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("test");

    const result = await db.collection("cars").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return Response.json({ error: "Car not found" }, { status: 404 });
    }

    return Response.json({ message: "Car updated successfully" });
  } catch (error) {
    console.error("PUT car error:", error);
    return Response.json({ error: "Failed to update car" }, { status: 500 });
  }
}