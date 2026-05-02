"use client";

import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    image: "", // ✅ NEW FIELD
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          year: Number(form.year),
          price: Number(form.price),
          mileage: Number(form.mileage),
        }),
      });

      if (res.ok) {
        setMessage("Car added successfully!");

        setForm({
          make: "",
          model: "",
          year: "",
          price: "",
          mileage: "",
          image: "", // reset image too
        });
      } else {
        setMessage("Failed to add car.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Add New Car (Admin)</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <input placeholder="Make"
          value={form.make}
          onChange={(e) => setForm({ ...form, make: e.target.value })}
        />
        <br /><br />

        <input placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
        />
        <br /><br />

        <input placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
        />
        <br /><br />

        <input placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <br /><br />

        <input placeholder="Mileage"
          value={form.mileage}
          onChange={(e) => setForm({ ...form, mileage: e.target.value })}
        />
        <br /><br />

        {/* ✅ NEW IMAGE INPUT */}
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Car"}
        </button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </main>
  );
}