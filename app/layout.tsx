import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "AutoDeal | Premium Used Vehicles",
  description:
    "Browse quality used vehicles with transparent pricing and a simple buying experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <Link href="/" className="brand" aria-label="AutoDeal home">
              <span className="brand-mark">A</span>
              <span>AutoDeal</span>
            </Link>

            <nav className="site-nav" aria-label="Primary navigation">
              <Link href="/">Home</Link>
              <Link href="/inventory">Inventory</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/admin">Admin</Link>
            </nav>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
