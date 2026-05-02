import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/* =========================
   GET ALL CARS
========================= */
export async function GET() {
  const client = await clientPromise;
  const db = client.db("test");

  const cars = await db.collection("cars").find().toArray();

  return Response.json(cars);
}

/* =========================
   ADD CAR
========================= */
export async function POST(req: Request) {
  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("test");

  const result = await db.collection("cars").insertOne(body);

  return Response.json(result);
}

/* =========================
   DELETE CAR (NEW)
========================= */
export async function DELETE(req: Request) {
  const { id } = await req.json();

  const client = await clientPromise;
  const db = client.db("test");

  const result = await db.collection("cars").deleteOne({
    _id: new ObjectId(id),
  });

  return Response.json(result);
}

/* =========================
   UPDATE CAR (NEW)
========================= */
export async function PUT(req: Request) {
  const { id, ...updateData } = await req.json();

  const client = await clientPromise;
  const db = client.db("test");

  const result = await db.collection("cars").updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );

  return Response.json(result);
}