import Link from "next/link";

const trustPoints = [
  {
    title: "Curated Inventory",
    text: "A tighter selection of vehicles, reviewed for condition, mileage, and everyday value before they hit the floor.",
  },
  {
    title: "Clear Numbers",
    text: "Pricing, mileage, vehicle details, and next steps are presented plainly so shoppers can move with confidence.",
  },
  {
    title: "Simple Visit",
    text: "Browse online, ask about a specific vehicle, then schedule a focused visit without the back-and-forth runaround.",
  },
];

const services = [
  ["Quality review", "Vehicle basics checked before listing"],
  ["Photo-first listings", "Real previews for fast comparison"],
  ["Helpful support", "Questions answered before you visit"],
];

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Premium used vehicles</p>
            <h1>AutoDeal</h1>
            <p>
              A cleaner way to shop quality used cars: sharp inventory, clear
              details, and a modern buying experience built around the vehicle.
            </p>
          </div>

          <div className="hero-actions">
            <Link href="/inventory" className="button button-primary">
              Browse Inventory
            </Link>
            <Link href="/contact" className="button button-outline">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="hero-strip" aria-label="AutoDeal highlights">
          <div className="hero-stat">
            <strong>01</strong>
            <span>Browse current listings</span>
          </div>
          <div className="hero-stat">
            <strong>02</strong>
            <span>Review details and photos</span>
          </div>
          <div className="hero-stat">
            <strong>03</strong>
            <span>Ask about the right vehicle</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="section-title">
            <p className="eyebrow">The showroom feel</p>
            <h2>Performance energy, practical shopping.</h2>
            <p>
              From classics to performance cars, the experience is built to
              feel direct, polished, and easy to scan before a shopper ever
              walks in.
            </p>
          </div>

          <div className="image-stack" aria-hidden="true">
            <img src="/showroom/classic-front.jpg" alt="" />
            <img src="/showroom/pagani-rear.jpg" alt="" />
          </div>
        </div>
      </section>

      <section className="section editorial-band">
        <div className="container">
          <div className="section-title">
            <p className="eyebrow">Why shoppers stay</p>
            <h2>Fast to scan. Easy to trust.</h2>
            <p>
              Buyers compare quickly. AutoDeal keeps photos, pricing, mileage,
              and contact actions close together so the next step is clear.
            </p>
          </div>

          <div className="feature-grid" style={{ marginTop: 28 }}>
            {trustPoints.map((point, index) => (
              <article className="feature-card" key={point.title}>
                <span className="number">{index + 1}</span>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <img
            className="feature-image"
            src="/showroom/manual-interior.jpg"
            alt="Manual shifter inside a vehicle"
          />

          <div>
            <div className="section-title">
              <p className="eyebrow">Built for decisions</p>
              <h2>Details that feel premium without hiding the basics.</h2>
            </div>

            <div className="feature-grid" style={{ marginTop: 28 }}>
              {services.map(([title, text]) => (
                <article className="feature-card" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-inner">
          <div className="section-title">
            <p className="eyebrow">Ready when they are</p>
            <h2>Make the inventory the next click.</h2>
            <p>
              Browse available vehicles, review the details, and reach out when
              the right car catches your eye.
            </p>
          </div>

          <Link href="/inventory" className="button button-primary">
            View Inventory
          </Link>
        </div>
      </section>
    </main>
  );
}
