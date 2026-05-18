import Link from "next/link";
import type { CSSProperties } from "react";

export default function Contact() {
  return (
    <main className="page">
      <section
        className="page-hero"
        style={
          {
            "--hero-image": "url('/showroom/yellow-detail.jpg')",
          } as CSSProperties
        }
      >
        <div className="container">
          <p className="eyebrow">Contact AutoDeal</p>
          <h1>Ask about a vehicle.</h1>
          <p>
            Send a question, confirm availability, or schedule a visit for the
            listing you are interested in.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">
          <div className="panel">
            <p className="eyebrow">Start here</p>
            <h2>We will help you take the next step.</h2>
            <p>
              Include the vehicle year, make, and model if you already found a
              listing. That makes it easier to answer quickly with the right
              details.
            </p>

            <div className="contact-list">
              <div className="contact-item">
                <span>Email</span>
                <strong>info@yourdealership.com</strong>
              </div>
              <div className="contact-item">
                <span>Built by</span>
                <strong>Komorebi Tech</strong>
              </div>
              <div className="contact-item">
                <span>Inventory</span>
                <strong>
                  <Link href="/inventory">View available cars</Link>
                </strong>
              </div>
            </div>
          </div>

          <img
            className="contact-image"
            src="/showroom/audi-night.jpg"
            alt="White vehicle with illuminated headlights"
          />
        </div>
      </section>
    </main>
  );
}
