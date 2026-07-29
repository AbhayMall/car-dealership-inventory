import {
  useEffect,
  useState,
} from "react";

import {
  Car,
  Package,
  Plus,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";

import api from "../services/api";

import VehicleCard from "../components/VehicleCard";

import AddVehicleModal
  from "../components/AddVehicleModal";

const AdminDashboard = () => {

  const [showAddModal, setShowAddModal] =
    useState(false);

  const handleAddVehicle = async (
    vehicleData
  ) => {

    await api.post(
      "/vehicles",
      vehicleData
    );

    await fetchVehicles();

  };

  const [vehicles, setVehicles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchVehicles = async () => {

    try {

      setLoading(true);

      const response = await api.get(
        "/vehicles"
      );

      setVehicles(
        response.data.vehicles ||
        response.data
      );

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to load inventory."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchVehicles();

  }, []);

  const totalVehicles =
    vehicles.length;

  const totalStock =
    vehicles.reduce(
      (total, vehicle) =>
        total + vehicle.quantity,
      0
    );

  const outOfStock =
    vehicles.filter(
      (vehicle) =>
        vehicle.quantity === 0
    ).length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <section className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <p className="font-semibold text-blue-600">
                ADMIN PANEL
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                Inventory Dashboard
              </h1>

              <p className="mt-2 text-gray-600">
                Manage vehicles and monitor your dealership inventory.
              </p>

            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={fetchVehicles}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <RefreshCw size={18} />
                Refresh
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={18} />
                Add Vehicle
              </button>
            </div>

          </div>

        </div>

      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Stats */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          <StatCard
            icon={<Car />}
            title="Vehicle Models"
            value={totalVehicles}
          />

          <StatCard
            icon={<Package />}
            title="Total Stock"
            value={totalStock}
          />

          <StatCard
            icon={<Package />}
            title="Out of Stock"
            value={outOfStock}
          />

        </div>

        {/* Management Section */}

        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>

              <h2 className="text-xl font-bold text-gray-900">
                Vehicle Management
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add, update, delete, and restock vehicles.
              </p>

            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >

              <Plus size={18} />

              Add Vehicle

            </button>

          </div>

        </div>

        {/* Inventory */}

        <div className="mt-8">

          {loading && (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {[1, 2, 3].map(
                (item) => (

                  <div
                    key={item}
                    className="h-96 animate-pulse rounded-2xl bg-gray-200"
                  />

                )
              )}

            </div>

          )}

          {error && (

            <div className="rounded-xl bg-red-50 p-5 text-red-700">
              {error}
            </div>

          )}

          {!loading &&
            !error &&
            vehicles.length === 0 && (

              <div className="rounded-2xl border border-gray-200 bg-white p-16 text-center">

                <Car
                  size={48}
                  className="mx-auto text-gray-400"
                />

                <h2 className="mt-4 text-xl font-bold">
                  No vehicles found
                </h2>

              </div>

            )}

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

        </div>

      </main>

      {showAddModal && (
        <AddVehicleModal
          onClose={() =>
            setShowAddModal(false)
          }
          onVehicleAdded={
            handleAddVehicle
          }
        />
      )}

    </div>
  );
};

const StatCard = ({
  icon,
  title,
  value,
}) => {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </p>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;