import {
  useState,
} from "react";

import {
  Search as SearchIcon,
  SlidersHorizontal,
  Car,
} from "lucide-react";

import VehicleCard from "../components/VehicleCard";
import Input from "../components/Input";
import Button from "../components/Button";

import api from "../services/api";

const Search = () => {

  const [filters, setFilters] = useState({
    make: "",
    model: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const [vehicles, setVehicles] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));

  };

  const handleSearch = async (event) => {

    event.preventDefault();

    setLoading(true);

    setError("");

    try {

      const params = {};

      Object.entries(filters).forEach(
        ([key, value]) => {

          if (value) {
            params[key] = value;
          }

        }
      );

      const response = await api.get(
        "/vehicles/search",
        {
          params,
        }
      );

      setVehicles(
        response.data.vehicles ||
        response.data
      );

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Search failed."
      );

    } finally {

      setLoading(false);

    }

  };

  return (
      <div className="min-h-screen bg-background">

      <section className="bg-brand px-4 py-16 text-white">

        <div className="mx-auto max-w-4xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">

            <SearchIcon size={26} />

          </div>

          <h1 className="mt-6 text-4xl font-bold">
            Find your perfect vehicle
          </h1>

          <p className="mt-4 text-gray-400">
            Search our inventory using multiple filters.
          </p>

        </div>

      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <form
          onSubmit={handleSearch}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
        >

          <div className="mb-6 flex items-center gap-3">

            <SlidersHorizontal
              size={20}
              className="text-blue-600"
            />

            <h2 className="text-xl font-bold text-gray-900">
              Search Filters
            </h2>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

                      <Input name="make" value={filters.make} onChange={handleChange} placeholder="Make" />

                      <Input name="model" value={filters.model} onChange={handleChange} placeholder="Model" />

                      <Input name="category" value={filters.category} onChange={handleChange} placeholder="Category" />

                      <Input name="minPrice" value={filters.minPrice} onChange={handleChange} type="number" placeholder="Min Price" />

                      <Input name="maxPrice" value={filters.maxPrice} onChange={handleChange} type="number" placeholder="Max Price" />

                    </div>

          <Button type="submit" loading={loading} className="mt-6 w-full inline-flex items-center justify-center gap-2">
                      <SearchIcon size={18} />
                      Search Vehicles
                    </Button>

        </form>

        {error && (
          <div className="mt-8 rounded-xl bg-red-50 p-5 text-red-700">
            {error}
          </div>
        )}

        {!loading &&
          vehicles.length === 0 &&
          !error && (

            <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-16 text-center">

              <Car
                size={48}
                className="mx-auto text-gray-400"
              />

              <h2 className="mt-4 text-xl font-bold">
                Search for a vehicle
              </h2>

              <p className="mt-2 text-gray-500">
                Enter your requirements above to find
                matching vehicles.
              </p>

            </div>

          )}

        {vehicles.length > 0 && (

          <div className="mt-10">

            <h2 className="mb-6 text-2xl font-bold">
              Search Results
            </h2>

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

          </div>

        )}

      </main>

    </div>
  );
};

export default Search;