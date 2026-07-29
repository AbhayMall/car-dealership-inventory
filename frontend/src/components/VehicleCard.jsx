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
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Vehicle Image Placeholder */}

      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gray-100">

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
            className="relative text-gray-400 transition duration-300 group-hover:scale-110"
          />
        )}

        {/* Category */}

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
          {category}
        </span>

        {/* Stock */}

        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
            isOutOfStock
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {isOutOfStock
            ? "Out of Stock"
            : `${quantity} Available`}
        </span>

      </div>

      {/* Content */}

      <div className="p-6">

        <p className="text-sm font-medium text-blue-600">
          {make}
        </p>

        <h3 className="mt-1 text-xl font-bold text-gray-900">
          {model}
        </h3>

        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">

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

            <p className="text-xs text-gray-500">
              Price
            </p>

            <p className="text-xl font-bold text-gray-900">
              £{Number(price).toLocaleString("en-GB")}
            </p>

          </div>

          <Link
            to={`/vehicles/${_id}`}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
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