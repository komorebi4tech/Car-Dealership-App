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
  const title = `${props.year} ${props.make} ${props.model}`;

  return (
    <article className="car-card">
      <div className="car-card-media">
        {mainPhoto ? (
          <img src={mainPhoto} alt={title} />
        ) : (
          <img src="/showroom/audi-night.jpg" alt="" />
        )}
        <span className="car-card-badge">Available</span>
      </div>

      <div className="car-card-body">
        <h2>{title}</h2>

        <div className="car-meta">
          <span className="car-price">${props.price.toLocaleString()}</span>
          <span>{props.mileage.toLocaleString()} miles</span>
        </div>

        <Link href={`/inventory/${props._id}`} className="button button-dark">
          View Details
        </Link>
      </div>
    </article>
  );
}
