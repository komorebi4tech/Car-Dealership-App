"use client";

import Link from "next/link";
import { useState } from "react";

type CarProps = {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  image?: string;
};

export default function CarCard(props: CarProps) {
  const [editing, setEditing] = useState(false);
  const [price, setPrice] = useState(props.price);
  const [loading, setLoading] = useState(false);

  /* =========================
     DELETE CAR
  ========================= */
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this car?")) return;

    setLoading(true);

    try {
      await fetch("/api/cars", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: props._id }),
      });

      window.location.reload(); // simple refresh for now
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     UPDATE CAR PRICE
  ========================= */
  async function handleUpdate() {
    setLoading(true);

    try {
      await fetch("/api/cars", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props._id,
          price,
        }),
      });

      setEditing(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        padding: 16,
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        background: "#fff",
      }}
    >
      {/* IMAGE */}
      {props.image && (
        <img
          src={props.image}
          alt={`${props.make} ${props.model}`}
          style={{
            width: "100%",
            height: 180,
            objectFit: "cover",
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
      )}

      <h2>
        {props.year} {props.make} {props.model}
      </h2>

      <p>
        <strong>
          ${props.price ? props.price.toLocaleString() : "N/A"}
        </strong>
      </p>

      <p style={{ color: "gray" }}>
        {props.mileage ? props.mileage.toLocaleString() : "N/A"} miles
      </p>

      {/* =========================
          VIEW DETAILS
      ========================= */}
      <Link href={`/inventory/${props._id}`}>
        <button
          style={{
            marginTop: 10,
            padding: "8px 12px",
            border: "none",
            borderRadius: 6,
            background: "#111",
            color: "white",
            cursor: "pointer",
          }}
        >
          View Details
        </button>
      </Link>

      {/* =========================
          DELETE BUTTON
      ========================= */}
      <button
        onClick={handleDelete}
        disabled={loading}
        style={{
          marginTop: 10,
          marginLeft: 8,
          padding: "8px 12px",
          border: "none",
          borderRadius: 6,
          background: "red",
          color: "white",
          cursor: "pointer",
        }}
      >
        {loading ? "..." : "Delete"}
      </button>

      {/* =========================
          EDIT BUTTON
      ========================= */}
      <button
        onClick={() => setEditing(!editing)}
        style={{
          marginTop: 10,
          marginLeft: 8,
          padding: "8px 12px",
          border: "none",
          borderRadius: 6,
          background: "#444",
          color: "white",
          cursor: "pointer",
        }}
      >
        Edit
      </button>

      {/* =========================
          EDIT PANEL
      ========================= */}
      {editing && (
        <div style={{ marginTop: 10 }}>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Update Price"
            style={{
              padding: 6,
              border: "1px solid #ccc",
              borderRadius: 6,
              marginRight: 6,
            }}
          />

          <button
            onClick={handleUpdate}
            disabled={loading}
            style={{
              padding: "6px 10px",
              border: "none",
              borderRadius: 6,
              background: "green",
              color: "white",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}