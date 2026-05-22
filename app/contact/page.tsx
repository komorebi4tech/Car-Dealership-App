"use client";

import Link from "next/link";
import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";

const inputStyle: CSSProperties = {
  width: "100%",
  border: "1px solid rgba(13, 17, 23, 0.14)",
  borderRadius: 8,
  background: "#fffbf4",
  color: "var(--ink)",
  padding: "14px 15px",
  outline: "none",
};

const labelStyle: CSSProperties = {
  display: "grid",
  gap: 8,
  color: "var(--ink-soft)",
  fontSize: 13,
  fontWeight: 900,
  letterSpacing: "0.02em",
};

const choiceStyle: CSSProperties = {
  alignItems: "center",
  border: "1px solid rgba(13, 17, 23, 0.14)",
  borderRadius: 8,
  cursor: "pointer",
  display: "flex",
  gap: 10,
  justifyContent: "center",
  minHeight: 48,
  padding: "12px 14px",
};

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const details = String(formData.get("details") || "");
    const callPreference =
      formData.get("callPreference") === "yes" ? "Yes, call me" : "No, email me";

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Can we call?: ${callPreference}`,
      "",
      "Details:",
      details,
    ].join("\n");

    setSent(true);
    event.currentTarget.reset();
    window.location.href = `mailto:contact@cambioautomotive.com?subject=${encodeURIComponent(
      "Cambio Automotive Contact Request"
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="page">
      <section
        className="page-hero"
        style={
          {
            "--hero-image": "url('/showroom/audi-night.jpg')",
          } as CSSProperties
        }
      >
        <div className="container">
          <p className="eyebrow">Contact Cambio Automotive</p>
          <h1>Let us help you find the right vehicle.</h1>
          <p>
            Send your question, tell us how you prefer to be reached, and we
            will help with availability, details, or scheduling a visit.
          </p>
        </div>
      </section>

      <section className="section">
        <div
          className="container"
          style={{
            display: "grid",
            gap: 22,
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          }}
        >
          <aside
            style={{
              borderRadius: 8,
              color: "var(--paper-bright)",
              minHeight: 640,
              overflow: "hidden",
              position: "relative",
              boxShadow: "var(--shadow)",
            }}
          >
            <img
              src="/showroom/yellow-detail.jpg"
              alt="Yellow performance vehicle detail"
              style={{
                display: "block",
                height: "100%",
                inset: 0,
                objectFit: "cover",
                position: "absolute",
                width: "100%",
              }}
            />

            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(13,17,23,0.18), rgba(13,17,23,0.9))",
                display: "grid",
                height: "100%",
                minHeight: 640,
                padding: "clamp(24px, 4vw, 36px)",
                position: "relative",
              }}
            >
              <div>
                <p className="eyebrow">Fast response</p>
                <h2
                  style={{
                    fontSize: "clamp(32px, 4vw, 54px)",
                    lineHeight: 1,
                    margin: 0,
                  }}
                >
                  Tell us the car. We will handle the next step.
                </h2>
              </div>

              <div
                style={{
                  alignSelf: "end",
                  display: "grid",
                  gap: 12,
                }}
              >
                {[
                  ["Availability", "Confirm whether a vehicle is still ready."],
                  ["Appointments", "Ask for a time to visit or test drive."],
                  ["Questions", "Send details before you make the trip."],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    style={{
                      background: "rgba(255, 251, 244, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      borderRadius: 8,
                      padding: 16,
                    }}
                  >
                    <strong style={{ display: "block", marginBottom: 4 }}>
                      {title}
                    </strong>
                    <span style={{ color: "rgba(255, 251, 244, 0.72)" }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            style={{
              background: "#fffbf4",
              border: "1px solid var(--line)",
              borderRadius: 8,
              boxShadow: "var(--shadow)",
              display: "grid",
              gap: 18,
              padding: "clamp(24px, 4vw, 38px)",
            }}
          >
            <div>
              <p className="eyebrow">Contact form</p>
              <h2
                style={{
                  fontSize: "clamp(32px, 4vw, 52px)",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                Send us a message
              </h2>
              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.65,
                  margin: "14px 0 0",
                  maxWidth: 620,
                }}
              >
                Leave your information below and include the vehicle year, make,
                or model if you already have one in mind.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gap: 14,
                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              }}
            >
              <label style={labelStyle}>
                Your Name
                <input
                  name="name"
                  placeholder="Your name"
                  required
                  style={inputStyle}
                  type="text"
                />
              </label>

              <label style={labelStyle}>
                Email Address
                <input
                  name="email"
                  placeholder="you@example.com"
                  required
                  style={inputStyle}
                  type="email"
                />
              </label>

              <label style={labelStyle}>
                Phone Number
                <input
                  name="phone"
                  placeholder="(555) 000-0000"
                  style={inputStyle}
                  type="tel"
                />
              </label>
            </div>

            <fieldset
              style={{
                border: 0,
                display: "grid",
                gap: 10,
                margin: 0,
                padding: 0,
              }}
            >
              <legend
                style={{
                  color: "var(--ink-soft)",
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: "0.02em",
                  marginBottom: 10,
                }}
              >
                Can we call you?
              </legend>

              <div
                style={{
                  display: "grid",
                  gap: 10,
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                }}
              >
                <label style={choiceStyle}>
                  <input name="callPreference" type="radio" value="yes" />
                  <strong>Yes, call me</strong>
                </label>

                <label style={choiceStyle}>
                  <input
                    defaultChecked
                    name="callPreference"
                    type="radio"
                    value="no"
                  />
                  <strong>No, email me</strong>
                </label>
              </div>
            </fieldset>

            <label style={labelStyle}>
              Details
              <textarea
                name="details"
                placeholder="Tell us which vehicle you are interested in, what questions you have, and the best time to reach you."
                required
                rows={7}
                style={{
                  ...inputStyle,
                  lineHeight: 1.5,
                  minHeight: 160,
                  resize: "vertical",
                }}
              />
            </label>

            {sent && (
              <p
                style={{
                  background: "rgba(24, 183, 188, 0.12)",
                  border: "1px solid rgba(24, 183, 188, 0.34)",
                  borderRadius: 8,
                  color: "var(--ink)",
                  fontWeight: 800,
                  margin: 0,
                  padding: "12px 14px",
                }}
              >
                Opening your email app with the message details.
              </p>
            )}

            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                justifyContent: "space-between",
              }}
            >
              <button className="button button-dark" type="submit">
                Send Message
              </button>

              <Link className="button button-outline-dark" href="/inventory">
                View Inventory
              </Link>
            </div>

            <div
              style={{
                borderTop: "1px solid var(--line)",
                color: "var(--muted)",
                display: "flex",
                flexWrap: "wrap",
                gap: 18,
                paddingTop: 18,
              }}
            >
              <span>
                <strong style={{ color: "var(--ink)" }}>Email:</strong>{" "}
                contact@cambioautomotive.com
              </span>
              <span>
                <strong style={{ color: "var(--ink)" }}>Phone:</strong> (555) 888-8888
              </span>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
