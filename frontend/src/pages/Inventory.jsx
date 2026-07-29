import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  Search,
  SlidersHorizontal,
  Car,
} from "lucide-react";

import VehicleCard from "../components/VehicleCard";

import api from "../services/api";

const Inventory = () => {

  const [vehicles, setVehicles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchVehicles = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await api.get(
        "/vehicles"
      );

      setVehicles(
        response.data.vehicles ||
        response.data
      );

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Unable to load vehicles."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchVehicles();

  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <section className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="font-semibold text-blue-600">
                OUR INVENTORY
              </p>

              <h1 className="mt-2 text-4xl font-bold text-gray-900">
                Find your next vehicle
              </h1>

              <p className="mt-3 max-w-2xl text-gray-600">
                Browse our available vehicles and find
                the perfect match for your journey.
              </p>

            </div>

            <Link
              to="/search"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              <Search size={18} />
              Advanced Search
            </Link>

          </div>

        </div>

      </section>

      {/* Main */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Search Bar */}

        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row">

          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search vehicles..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          <button
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

        </div>

        {/* Error */}

        {error && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="h-96 animate-pulse rounded-2xl bg-gray-200"
                />
              )
            )}

          </div>
        )}

        {/* Empty */}

        {!loading &&
          !error &&
          vehicles.length === 0 && (

            <div className="rounded-2xl border border-gray-200 bg-white p-16 text-center">

              <Car
                size={48}
                className="mx-auto text-gray-400"
              />

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                No vehicles available
              </h2>

              <p className="mt-2 text-gray-500">
                Check back later for new inventory.
              </p>

            </div>

          )}

        {/* Vehicles */}

        {!loading &&
          vehicles.length > 0 && (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {vehicles.map(
                (vehicle) => (

                  <VehicleCard
                    key={vehicle._id}
                    vehicle={vehicle}
                  />

                )
              )}

            </div>

          )}

      </main>

    </div>
  );
};

export default Inventory;