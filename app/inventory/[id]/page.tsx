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
      <main className="page section-tight">
        <div className="container">
          <p className="pill">Loading vehicle details...</p>
        </div>
      </main>
    );
  }

  const interiorColorDisplay = car.interiorColors?.length
    ? car.interiorColors.join(" / ")
    : car.interiorColor || "";
  const title = `${car.year} ${car.make} ${car.model}`;
  const displayPhoto = selectedPhoto || "/showroom/audi-night.jpg";

  return (
    <main className="page">
      <section className="section-tight">
        <div className="container">
          <Link href="/inventory" className="back-link">
            Back to Inventory
          </Link>

          <div className="detail-layout">
            <section>
              <img className="detail-hero-image" src={displayPhoto} alt={title} />

              {car.photos && car.photos.length > 0 && (
                <div className="thumb-grid">
                  {car.photos.map((photo, index) => (
                    <button
                      className={`thumb-button${
                        selectedPhoto === photo ? " is-active" : ""
                      }`}
                      key={photo}
                      onClick={() => setSelectedPhoto(photo)}
                      type="button"
                    >
                      <img
                        className="thumb-image"
                        src={photo}
                        alt={`Vehicle photo ${index + 1}`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>

            <aside className="panel">
              <span className="pill">Available</span>
              <h1 className="detail-title">{title}</h1>

              <p className="detail-price">
                ${car.price ? car.price.toLocaleString() : "N/A"}
              </p>
              <p style={{ color: "var(--muted)", margin: 0 }}>
                {car.mileage ? car.mileage.toLocaleString() : "N/A"} miles
              </p>

              <div className="spec-grid">
                <Spec label="Body Style" value={car.bodyStyle} />
                <Spec label="Engine" value={car.engine} />
                <Spec label="Drive Type" value={car.driveType} />
                <Spec label="Transmission" value={car.transmission} />
                <Spec label="Exterior Color" value={car.exteriorColor} />
                <Spec label="Interior Color" value={interiorColorDisplay} />
                <Spec label="Fuel" value={car.fuel || car.fuelType} />
                <Spec label="Seat Heat" value={car.seatHeat} />
              </div>

              <Link
                href="/contact"
                className="button button-accent"
                style={{ width: "100%", marginTop: 24 }}
              >
                Contact About This Vehicle
              </Link>
            </aside>
          </div>

          <section className="panel description-panel">
            <p className="eyebrow">Vehicle description</p>
            <h2>About this listing</h2>
            <p>
              {car.description ||
                "This vehicle is available now. Contact us for more details, financing options, or to schedule a visit."}
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

function Spec({ label, value }: { label: string; value?: string }) {
  return (
    <div className="spec-card">
      <span>{label}</span>
      <strong>{value || "N/A"}</strong>
    </div>
  );
}
