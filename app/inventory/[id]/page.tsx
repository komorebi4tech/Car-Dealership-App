"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

type Car = {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  bodyStyle?: string;
  driveType?: string;
  exteriorColor?: string;
  interiorColors?: string[];
  interiorColor?: string;
  transmission?: string;
  engine?: string;
  fuel?: string;
  fuelType?: string;
  seatHeat?: string;
  vin?: string;
  description?: string;
  photos?: string[];
};

export default function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const [car, setCar] = useState<Car | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState("");

  useEffect(() => {
    async function fetchCar() {
      const res = await fetch(`/api/cars/${id}`);
      const data = await res.json();

      setCar(data);
      setSelectedPhoto(data.photos?.[0] || "");
    }

    fetchCar();
  }, [id]);

  if (!car) {
    return (
      <main style={{ padding: 40 }}>
        <p>Loading vehicle details...</p>
      </main>
    );
  }

  const interiorColorDisplay = car.interiorColors?.length
    ? car.interiorColors.join(" / ")
    : car.interiorColor || "";

  return (
    <main style={{ background: "#f8fafc", minHeight: "100vh", padding: 40 }}>
      <div style={{ maxWidth: 1150, margin: "0 auto" }}>
        <Link href="/inventory" style={{ color: "#2563eb", fontWeight: "bold" }}>
          ← Back to Inventory
        </Link>

        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 30,
          }}
        >
          <section>
            {selectedPhoto ? (
              <img
                src={selectedPhoto}
                alt={`${car.year} ${car.make} ${car.model}`}
                style={{
                  width: "100%",
                  height: 430,
                  objectFit: "cover",
                  borderRadius: 18,
                  border: "1px solid #e5e7eb",
                  background: "white",
                }}
              />
            ) : (
              <div
                style={{
                  height: 430,
                  borderRadius: 18,
                  border: "1px solid #e5e7eb",
                  background: "#e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b7280",
                  fontWeight: "bold",
                }}
              >
                No Image Available
              </div>
            )}

            {car.photos && car.photos.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))",
                  gap: 12,
                  marginTop: 14,
                }}
              >
                {car.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Vehicle photo ${index + 1}`}
                    onClick={() => setSelectedPhoto(photo)}
                    style={{
                      width: "100%",
                      height: 75,
                      objectFit: "cover",
                      borderRadius: 10,
                      cursor: "pointer",
                      border:
                        selectedPhoto === photo
                          ? "3px solid #2563eb"
                          : "1px solid #e5e7eb",
                    }}
                  />
                ))}
              </div>
            )}
          </section>

          <section
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 18,
              padding: 28,
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              height: "fit-content",
            }}
          >
            <p
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: 999,
                background: "#dcfce7",
                color: "#166534",
                fontWeight: "bold",
                marginTop: 0,
              }}
            >
              Available
            </p>

            <h1 style={{ margin: "8px 0", fontSize: 36 }}>
              {car.year} {car.make} {car.model}
            </h1>

            <p
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "#111827",
                margin: "16px 0",
              }}
            >
              ${car.price ? car.price.toLocaleString() : "N/A"}
            </p>

            <p style={{ color: "#6b7280", fontSize: 18 }}>
              {car.mileage ? car.mileage.toLocaleString() : "N/A"} miles
            </p>

            <hr style={{ margin: "24px 0", border: "1px solid #f3f4f6" }} />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <Spec label="Body Style" value={car.bodyStyle} />
              <Spec label="Engine" value={car.engine} />
              <Spec label="Drive Type" value={car.driveType} />
              <Spec label="Transmission" value={car.transmission} />
              <Spec label="Exterior Color" value={car.exteriorColor} />
              <Spec label="Interior Color" value={interiorColorDisplay} />
              <Spec label="Fuel" value={car.fuel || car.fuelType} />
              <Spec label="Seat Heat" value={car.seatHeat} />
            
            </div>

            <Link href="/contact">
              <button
                style={{
                  marginTop: 28,
                  width: "100%",
                  padding: 14,
                  border: "none",
                  borderRadius: 12,
                  background: "#2563eb",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                Contact About This Vehicle
              </button>
            </Link>
          </section>
        </div>

        <section
          style={{
            marginTop: 30,
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: 18,
            padding: 28,
          }}
        >
          <h2>Vehicle Description</h2>
          <p style={{ color: "#4b5563", lineHeight: 1.7 }}>
            {car.description ||
              "This vehicle is available now. Contact us for more details, financing options, or to schedule a visit."}
          </p>
        </section>
      </div>
    </main>
  );
}

function Spec({ label, value }: { label: string; value?: string }) {
  return (
    <div
      style={{
        background: "#f9fafb",
        padding: 14,
        borderRadius: 12,
        border: "1px solid #f3f4f6",
      }}
    >
      <p style={{ margin: "0 0 4px", color: "#6b7280", fontSize: 13 }}>
        {label}
      </p>
      <p style={{ margin: 0, fontWeight: "bold", color: "#111827" }}>
        {value || "N/A"}
      </p>
    </div>
  );
}