import CarCard from "@/components/CarCard";

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
    <main style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <section
        style={{
          padding: "50px 40px",
          background: "#111827",
          color: "white",
        }}
      >
        <div style={{ maxWidth: 1150, margin: "0 auto" }}>
          <p style={{ color: "#93c5fd", fontWeight: "bold" }}>
            VEHICLE INVENTORY
          </p>

          <h1 style={{ fontSize: 42, margin: "8px 0" }}>
            Browse Available Cars
          </h1>

          <p style={{ color: "#d1d5db", maxWidth: 600, lineHeight: 1.6 }}>
            Explore our current selection of quality used vehicles with clear
            pricing, mileage details, and photo previews.
          </p>
        </div>
      </section>

      <section style={{ padding: "35px 40px" }}>
        <div style={{ maxWidth: 1150, margin: "0 auto" }}>
          <div
            style={{
              marginBottom: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div>
              <h2 style={{ margin: 0 }}>Current Listings</h2>
              <p style={{ marginTop: 6, color: "#6b7280" }}>
                {cars.length} vehicle{cars.length === 1 ? "" : "s"} available
              </p>
            </div>

            <div
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: "10px 14px",
                color: "#374151",
                fontWeight: "bold",
              }}
            >
              Updated inventory
            </div>
          </div>

          {cars.length === 0 ? (
            <div
              style={{
                background: "white",
                padding: 40,
                borderRadius: 16,
                border: "1px solid #e5e7eb",
                textAlign: "center",
              }}
            >
              <h3>No cars available right now</h3>
              <p style={{ color: "#6b7280" }}>
                Please check back later or contact us for upcoming inventory.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 16,
              }}
            >
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