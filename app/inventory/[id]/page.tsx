"use client";

import CarCard from "@/components/CarCard";
import { useEffect, useState } from "react";

type Car = {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  image?: string;
};

export default function Inventory() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

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

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    if (sort === "mileage-low") return a.mileage - b.mileage;
    if (sort === "mileage-high") return b.mileage - a.mileage;
    if (sort === "year-newest") return b.year - a.year;
    if (sort === "year-oldest") return a.year - b.year;

    return 0;
  });

  return (
    <main style={{ padding: 40 }}>
      <h1>Inventory</h1>

      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <input
          placeholder="Search make, model, year..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: 10,
            flex: 1,
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
        >
          <option value="newest">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="mileage-low">Mileage: Low to High</option>
          <option value="mileage-high">Mileage: High to Low</option>
          <option value="year-newest">Year: Newest First</option>
          <option value="year-oldest">Year: Oldest First</option>
        </select>
      </div>

      {sortedCars.length === 0 && (
        <p style={{ color: "gray" }}>No cars found.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {sortedCars.map((car) => (
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