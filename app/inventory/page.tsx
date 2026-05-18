import CarCard from "@/components/CarCard";
import type { CSSProperties } from "react";

type Car = {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  photos?: string[];
};

async function getCars(): Promise<Car[]> {
  try {
    const res = await fetch("http://localhost:3000/api/cars", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cars");
    }

    return res.json();
  } catch (error) {
    console.error("Fetch cars error:", error);
    return [];
  }
}

export default async function InventoryPage() {
  const cars = await getCars();

  return (
    <main className="page">
      <section
        className="page-hero"
        style={{ "--hero-image": "url('/showroom/audi-road.jpg')" } as CSSProperties}
      >
        <div className="container">
          <p className="eyebrow">Vehicle inventory</p>
          <h1>Browse Available Cars</h1>
          <p>
            Compare current listings with clean photos, mileage, pricing, and
            direct access to the vehicle details that matter.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="toolbar">
            <div>
              <p className="eyebrow">Current listings</p>
              <h2>{cars.length} vehicle{cars.length === 1 ? "" : "s"}</h2>
            </div>

            <span className="pill">Updated inventory</span>
          </div>

          {cars.length === 0 ? (
            <div className="empty-state">
              <h3>No cars available right now</h3>
              <p>
                Please check back later or contact us for upcoming inventory.
              </p>
            </div>
          ) : (
            <div className="inventory-grid">
              {cars.map((car) => (
                <CarCard key={car._id} {...car} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
