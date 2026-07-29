import {
  Link,
} from "react-router-dom";

import {
  Car,
  Gauge,
  Tag,
  ArrowRight,
} from "lucide-react";

const VehicleCard = ({
  vehicle,
}) => {

  const {
    _id,
    make,
    model,
    category,
    price,
    quantity,
  } = vehicle;

  const isOutOfStock = quantity === 0;

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-card">

      {/* Vehicle Image Placeholder */}

      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-surface/50">

        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />

        {vehicle.images && vehicle.images.length > 0 ? (
          <img
            src={vehicle.images[0]}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="relative h-full w-full object-cover"
          />
        ) : (
          <Car
            size={100}
            strokeWidth={1}
            className="relative text-text-secondary transition duration-300 group-hover:scale-110"
          />
        )}

        {/* Category */}

        <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-xs font-semibold text-text-primary shadow-sm">
          {category}
        </span>

        {/* Stock */}

        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
            isOutOfStock
              ? "bg-error/10 text-error"
              : "bg-success/10 text-success"
          }`}
        >
          {isOutOfStock
            ? "Out of Stock"
            : `${quantity} Available`}
        </span>

      </div>

      {/* Content */}

      <div className="p-6">

        <p className="text-sm font-medium text-primary">
          {make}
        </p>

        <h3 className="mt-1 text-xl font-bold text-text-primary">
          {model}
        </h3>

        <div className="mt-4 flex items-center gap-4 text-sm text-text-secondary">

          <span className="flex items-center gap-1">
            <Tag size={16} />
            {category}
          </span>

          <span className="flex items-center gap-1">
            <Gauge size={16} />
            In Stock
          </span>

        </div>

        <div className="mt-6 flex items-center justify-between">

          <div>

            <p className="text-xs text-text-secondary">
              Price
            </p>

                        <p className="text-xl font-bold text-text-primary">
              £{Number(price).toLocaleString("en-GB")}
            </p>

          </div>

          <Link
            to={`/vehicles/${_id}`}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            View Details
            <ArrowRight size={16} />
          </Link>

        </div>

      </div>

    </div>
  );
};

export default VehicleCard;