"use client";

import { useEffect, useState } from "react";

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

const bodyStyleOptions = [
  "Sedan",
  "SUV",
  "SUV Sport",
  "Pickup Truck",
  "MINI VAN",
  "Hatchback",
  "Coupe",
];

const driveTypeOptions = ["AWD", "4WD", "FWD", "RWD"];

const transmissionOptions = ["Automatic", "Manual"];

const engineOptions = ["3 cyl", "4 cyl", "6 cyl", "8 cyl"];

const fuelOptions = ["Gas", "Diesel", "EV", "Hybrid"];

const interiorColorOptions = ["White", "Black", "Tan", "Beige", "Light Gray"];

const exteriorColorOptions = ["White", "Black", "Blue", "Red", "Gray", "Silver"];

const seatHeatOptions = ["Yes", "No"];

export default function AdminPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState("");

  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    bodyStyle: "",
    driveType: "",
    exteriorColor: "",
    interiorColors: [] as string[],
    transmission: "",
    engine: "",
    fuel: "",
    seatHeat: "",
    vin: "",
    description: "",
    photos: [] as string[],
  });

  async function fetchCars() {
    const res = await fetch("/api/cars");
    const data = await res.json();
    setCars(data);
  }

  useEffect(() => {
    let ignore = false;

    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setCars(data);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  function resetForm() {
    setEditingId(null);
    setPhotoUrl("");
    setForm({
      make: "",
      model: "",
      year: "",
      price: "",
      mileage: "",
      bodyStyle: "",
      driveType: "",
      exteriorColor: "",
      interiorColors: [],
      transmission: "",
      engine: "",
      fuel: "",
      seatHeat: "",
      vin: "",
      description: "",
      photos: [],
    });
  }

  function addPhoto() {
    if (!photoUrl.trim()) return;

    setForm({
      ...form,
      photos: [...form.photos, photoUrl.trim()],
    });

    setPhotoUrl("");
  }

  function removePhoto(index: number) {
    setForm({
      ...form,
      photos: form.photos.filter((_, i) => i !== index),
    });
  }

  function toggleInteriorColor(color: string) {
    const alreadySelected = form.interiorColors.includes(color);

    setForm({
      ...form,
      interiorColors: alreadySelected
        ? form.interiorColors.filter((item) => item !== color)
        : [...form.interiorColors, color],
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const carData = {
      ...form,
      year: Number(form.year),
      price: Number(form.price),
      mileage: Number(form.mileage),
    };

    if (editingId) {
      await fetch(`/api/cars/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData),
      });
    } else {
      await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData),
      });
    }

    resetForm();
    fetchCars();
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this car? This action cannot be undone."
    );

    if (!confirmed) return;

    await fetch(`/api/cars/${id}`, {
      method: "DELETE",
    });

    fetchCars();
  }

  function handleEdit(car: Car) {
    setEditingId(car._id);

    setForm({
      make: car.make || "",
      model: car.model || "",
      year: String(car.year || ""),
      price: String(car.price || ""),
      mileage: String(car.mileage || ""),
      bodyStyle: car.bodyStyle || "",
      driveType: car.driveType || "",
      exteriorColor: car.exteriorColor || "",
      interiorColors: car.interiorColors || (car.interiorColor ? [car.interiorColor] : []),
      transmission: car.transmission || "",
      engine: car.engine || "",
      fuel: car.fuel || car.fuelType || "",
      seatHeat: car.seatHeat || "",
      vin: car.vin || "",
      description: car.description || "",
      photos: car.photos || [],
    });
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <p className="eyebrow">Inventory control</p>
        <h1>Admin Inventory</h1>
        <p>
          Add, update, and manage the vehicle listings that appear across the
          public inventory pages.
        </p>
      </header>

      <form
        className="admin-form"
        onSubmit={handleSubmit}
        style={{
          background: "var(--paper-bright)",
          padding: 24,
          borderRadius: 8,
          marginBottom: 40,
          border: "1px solid var(--line)",
          boxShadow: "var(--shadow)",
        }}
      >
        <h2>{editingId ? "Edit Car" : "Add New Car"}</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <input
            placeholder="Make"
            value={form.make}
            onChange={(e) => setForm({ ...form, make: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          />

          <input
            placeholder="Model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          />

          <input
            placeholder="Year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          />

          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          />

          <input
            placeholder="Mileage"
            value={form.mileage}
            onChange={(e) => setForm({ ...form, mileage: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          />

          <select
            value={form.bodyStyle}
            onChange={(e) => setForm({ ...form, bodyStyle: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          >
            <option value="">Select Body Style</option>
            {bodyStyleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={form.driveType}
            onChange={(e) => setForm({ ...form, driveType: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          >
            <option value="">Select Drive Type</option>
            {driveTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={form.transmission}
            onChange={(e) => setForm({ ...form, transmission: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          >
            <option value="">Select Transmission</option>
            {transmissionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={form.engine}
            onChange={(e) => setForm({ ...form, engine: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          >
            <option value="">Select Engine</option>
            {engineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={form.fuel}
            onChange={(e) => setForm({ ...form, fuel: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          >
            <option value="">Select Fuel</option>
            {fuelOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={form.exteriorColor}
            onChange={(e) => setForm({ ...form, exteriorColor: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          >
            <option value="">Select Exterior Color</option>
            {exteriorColorOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={form.seatHeat}
            onChange={(e) => setForm({ ...form, seatHeat: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          >
            <option value="">Seat Heat</option>
            {seatHeatOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <input
            placeholder="VIN"
            value={form.vin}
            onChange={(e) => setForm({ ...form, vin: e.target.value })}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          />
        </div>

        <div
          style={{
            marginTop: 16,
            padding: 14,
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            background: "#f9fafb",
          }}
        >
          <p style={{ margin: "0 0 10px", fontWeight: "bold" }}>
            Interior Color
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {interiorColorOptions.map((color) => (
              <label
                key={color}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#fff",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.interiorColors.includes(color)}
                  onChange={() => toggleInteriorColor(color)}
                />
                {color}
              </label>
            ))}
          </div>

          {form.interiorColors.length > 0 && (
            <p style={{ margin: "12px 0 0", color: "#374151" }}>
              Selected: {form.interiorColors.join(" / ")}
            </p>
          )}
        </div>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{
            width: "100%",
            marginTop: 12,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ddd",
            minHeight: 90,
          }}
        />

        <h3 style={{ marginTop: 20 }}>Photos</h3>

        <div style={{ display: "flex", gap: 10 }}>
          <input
            placeholder="Paste image URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          />

          <button
            type="button"
            onClick={addPhoto}
            style={{
              padding: "10px 14px",
              border: "none",
              borderRadius: 8,
              background: "#111827",
              color: "white",
              cursor: "pointer",
            }}
          >
            Add Photo
          </button>
        </div>

        {form.photos.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: 12,
              marginTop: 14,
            }}
          >
            {form.photos.map((photo, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={photo}
                  alt="Car preview"
                  style={{
                    width: "100%",
                    height: 90,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                  }}
                />

                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    border: "none",
                    borderRadius: 6,
                    background: "#dc2626",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          style={{
            marginTop: 20,
            width: "100%",
            padding: 12,
            borderRadius: 8,
            border: "none",
            background: editingId ? "#16a34a" : "#2563eb",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {editingId ? "Update Car" : "Add Car"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={{
              marginTop: 10,
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ddd",
              background: "#f3f4f6",
              cursor: "pointer",
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <section className="admin-list">
        <p className="eyebrow">Live listings</p>
        <h2>Current Cars</h2>

      <div style={{ display: "grid", gap: 16 }}>
        {cars.map((car) => (
          <div
            key={car._id}
            style={{
              border: "1px solid var(--line)",
              padding: 20,
              borderRadius: 8,
              background: "var(--paper-bright)",
              boxShadow: "0 12px 32px rgba(13,17,23,0.08)",
              display: "flex",
              gap: 20,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              {car.photos?.[0] && (
                <img
                  src={car.photos[0]}
                  alt={`${car.make} ${car.model}`}
                  style={{
                    width: 120,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                />
              )}

              <div>
                <h3 style={{ margin: "0 0 8px" }}>
                  {car.year} {car.make} {car.model}
                </h3>

                <p style={{ margin: "4px 0", fontWeight: "bold" }}>
                  ${car.price.toLocaleString()}
                </p>

                <p style={{ margin: "0 0 4px", color: "#6b7280" }}>
                  {car.mileage.toLocaleString()} miles
                </p>

                <p style={{ margin: 0, color: "#6b7280", fontSize: 14 }}>
                  {car.bodyStyle || "Body Style N/A"} |{" "}
                  {car.driveType || "Drive Type N/A"} |{" "}
                  {car.transmission || "Transmission N/A"}
                </p>

                <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: 14 }}>
                  Interior:{" "}
                  {car.interiorColors?.length
                    ? car.interiorColors.join(" / ")
                    : car.interiorColor || "N/A"}{" "}
                  | Exterior: {car.exteriorColor || "N/A"}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => handleEdit(car)}
                style={{
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: 8,
                  background: "#2563eb",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(car._id)}
                style={{
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: 8,
                  background: "#dc2626",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      </section>
    </main>
  );
}
