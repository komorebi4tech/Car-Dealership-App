import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

/* =========================
   GET SINGLE CAR
========================= */
export async function GET(_req: Request, { params }: Props) {
  try {
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
      return Response.json({ error: "Invalid car ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("test");

    const car = await db.collection("cars").findOne({
      _id: new ObjectId(id),
    });

    if (!car) {
      return Response.json({ error: "Car not found" }, { status: 404 });
    }

    return Response.json(car);
  } catch (error) {
    console.error("GET single car error:", error);
    return Response.json({ error: "Failed to fetch car" }, { status: 500 });
  }
}

/* =========================
   UPDATE CAR
========================= */
export async function PUT(req: Request, { params }: Props) {
  try {
    const { id } = await params;
    const body = await req.json();

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

/* =========================
   DELETE CAR
========================= */
export async function DELETE(_req: Request, { params }: Props) {
  try {
    const { id } = await params;

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