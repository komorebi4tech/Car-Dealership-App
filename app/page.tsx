export default function Home() {
  return (
    <main style={{ padding: 60 }}>
      <h1>Find Your Next Car</h1>

      <p style={{ maxWidth: 500, color: "gray" }}>
        Browse high-quality used vehicles at competitive prices. Built for
        simplicity, transparency, and speed.
      </p>

      <a href="/inventory">
        <button
          style={{
            marginTop: 20,
            padding: "10px 16px",
            border: "none",
            borderRadius: 8,
            background: "#111",
            color: "white",
            cursor: "pointer",
          }}
        >
          Browse Inventory
        </button>
      </a>
    </main>
  );
}