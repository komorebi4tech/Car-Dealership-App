import Link from "next/link";

export default function Home() {
  return (
    <main style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* HERO */}
      <section
        style={{
          padding: "80px 60px",
          background: "linear-gradient(135deg, #111827, #1f2937)",
          color: "white",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "#93c5fd", fontWeight: "bold" }}>
            PREMIUM USED VEHICLES
          </p>

          <h1
            style={{
              fontSize: 56,
              lineHeight: 1.1,
              maxWidth: 720,
              margin: "12px 0",
            }}
          >
            Find the Right Car at the Right Price
          </h1>

          <p
            style={{
              maxWidth: 560,
              color: "#d1d5db",
              fontSize: 18,
              lineHeight: 1.6,
            }}
          >
            Browse reliable, high-quality used vehicles with transparent pricing,
            detailed listings, and a simple buying experience.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <Link href="/inventory">
              <button
                style={{
                  padding: "14px 22px",
                  border: "none",
                  borderRadius: 10,
                  background: "#2563eb",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Browse Inventory
              </button>
            </Link>

            <Link href="/contact">
              <button
                style={{
                  padding: "14px 22px",
                  border: "1px solid #9ca3af",
                  borderRadius: 10,
                  background: "transparent",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST CARDS */}
      <section style={{ padding: "50px 60px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {[
            ["Quality Checked", "Every vehicle is reviewed before listing."],
            ["Transparent Pricing", "Clear prices with no confusing surprises."],
            ["Easy Financing", "Flexible options for different budgets."],
            ["Fast Support", "Contact us quickly about any vehicle."],
          ].map(([title, text]) => (
            <div
              key={title}
              style={{
                background: "white",
                padding: 24,
                borderRadius: 16,
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3 style={{ marginTop: 0 }}>{title}</h3>
              <p style={{ color: "#6b7280", lineHeight: 1.5 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "20px 60px 70px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            background: "white",
            borderRadius: 18,
            padding: 36,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            border: "1px solid #e5e7eb",
          }}
        >
          <div>
            <h2 style={{ marginTop: 0 }}>Ready to explore available cars?</h2>
            <p style={{ color: "#6b7280", marginBottom: 0 }}>
              View our current inventory and find a vehicle that fits your needs.
            </p>
          </div>

          <Link href="/inventory">
            <button
              style={{
                padding: "12px 18px",
                border: "none",
                borderRadius: 10,
                background: "#111827",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              View Inventory
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}