"use client";

import CarCard from "@/components/CarCard";
import { useEffect, useState } from "react";

export default function Inventory() {
  const [cars, setCars] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  async function fetchCars() {
    const res = await fetch("/api/cars");
    const data = await res.json();
    setCars(data);
  }

  useEffect(() => {
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const q = search.toLowerCase();
    return (
      car.make?.toLowerCase().includes(q) ||
      car.model?.toLowerCase().includes(q) ||
      String(car.year).includes(q)
    );
  });

  return (
    <main style={{ padding: 40 }}>
      <h1>Inventory</h1>

      {/* SEARCH */}
      <input
        placeholder="Search make, model, year..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 10,
          width: "100%",
          marginBottom: 20,
          border: "1px solid #ccc",
          borderRadius: 6,
        }}
      />

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {filteredCars.map((car) => (
          <CarCard
            key={car._id}
            _id={car._id}
            make={car.make}
            model={car.model}
            year={car.year}
            price={car.price}
            mileage={car.mileage}
            image={car.image}
          />
        ))}
      </div>
    </main>
  );
}