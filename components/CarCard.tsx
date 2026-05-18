import Link from "next/link";

type CarProps = {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  photos?: string[];
};

export default function CarCard(props: CarProps) {
  const mainPhoto = props.photos?.[0];

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 5px 14px rgba(0,0,0,0.05)",
      }}
    >
      {mainPhoto ? (
        <img
          src={mainPhoto}
          alt={`${props.year} ${props.make} ${props.model}`}
          style={{
            width: "100%",
            height: 155,
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: 155,
            background: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
            fontWeight: "bold",
            fontSize: 13,
          }}
        >
          No Image Available
        </div>
      )}

      <div style={{ padding: 13 }}>
        <div
          style={{
            display: "inline-block",
            padding: "4px 8px",
            borderRadius: 999,
            background: "#eff6ff",
            color: "#2563eb",
            fontSize: 12,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          Available
        </div>

        <h2
          style={{
            margin: "0 0 8px",
            fontSize: 17,
            lineHeight: 1.2,
            color: "#111827",
          }}
        >
          {props.year} {props.make} {props.model}
        </h2>

        <p
          style={{
            margin: "0 0 6px",
            fontSize: 18,
            fontWeight: "bold",
            color: "#111827",
          }}
        >
          ${props.price.toLocaleString()}
        </p>

        <p
          style={{
            margin: "0 0 12px",
            color: "#6b7280",
            fontSize: 13,
          }}
        >
          {props.mileage.toLocaleString()} miles
        </p>

        <Link href={`/inventory/${props._id}`}>
          <button
            style={{
              width: "100%",
              padding: "9px 12px",
              border: "none",
              borderRadius: 8,
              background: "#111827",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 13,
            }}
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}