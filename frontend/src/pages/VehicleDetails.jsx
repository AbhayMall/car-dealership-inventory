import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Car,
  CheckCircle,
  Package,
} from "lucide-react";

import api from "../services/api";

const VehicleDetails = () => {

  const {
    id,
  } = useParams();

  const navigate = useNavigate();

  const [vehicle, setVehicle] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [purchasing, setPurchasing] =
    useState(false);

  const [purchaseMessage, setPurchaseMessage] =
    useState("");

  const handlePurchase = async () => {
    try {
      setPurchasing(true);
      setPurchaseMessage("");

      const response = await api.post(
        `/vehicles/${id}/purchase`
      );

      setVehicle(
        response.data.vehicle ||
        response.data
      );

      setPurchaseMessage(
        "Vehicle purchased successfully!"
      );
    } catch (error) {
      setPurchaseMessage(
        error.response?.data?.message ||
        "Purchase failed."
      );
    } finally {
      setPurchasing(false);
    }
  };

  useEffect(() => {

    const fetchVehicle = async () => {

      try {

        const response = await api.get(
          `/vehicles/${id}`
        );

        setVehicle(
          response.data.vehicle ||
          response.data
        );

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Unable to load vehicle."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchVehicle();

  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">
          Loading vehicle...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">

        <p className="text-red-600">
          {error}
        </p>

        <button
          onClick={() => navigate("/inventory")}
          className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          Back to Inventory
        </button>

      </div>
    );
  }

  if (!vehicle) {
    return null;
  }

  const isOutOfStock =
    vehicle.quantity === 0;

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-2">

          {/* Visual */}

          <div className="flex min-h-[500px] items-center justify-center bg-gray-100">

            <Car
              size={220}
              strokeWidth={1}
              className="text-gray-400"
            />

          </div>

          {/* Details */}

          <div className="p-8 sm:p-12">

            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              {vehicle.category}
            </span>

            <p className="mt-8 text-lg font-semibold text-blue-600">
              {vehicle.make}
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              {vehicle.model}
            </h1>

            <p className="mt-6 text-3xl font-bold text-gray-900">
              £{Number(vehicle.price).toLocaleString("en-GB")}
            </p>

            <div className="my-8 h-px bg-gray-200" />

            <div className="grid grid-cols-2 gap-5">

              <div className="rounded-xl bg-gray-50 p-4">

                <p className="text-sm text-gray-500">
                  Category
                </p>

                <p className="mt-1 font-semibold">
                  {vehicle.category}
                </p>

              </div>

              <div className="rounded-xl bg-gray-50 p-4">

                <p className="text-sm text-gray-500">
                  Available
                </p>

                <p className="mt-1 font-semibold">
                  {vehicle.quantity}
                </p>

              </div>

            </div>

            <div className="mt-8 flex items-center gap-3">

              {isOutOfStock ? (
                <>
                  <Package className="text-red-500" />

                  <p className="font-medium text-red-600">
                    Currently out of stock
                  </p>
                </>
              ) : (
                <>
                  <CheckCircle className="text-green-500" />

                  <p className="font-medium text-green-600">
                    Available for purchase
                  </p>
                </>
              )}

            </div>

            <button
              onClick={handlePurchase}
              disabled={
                isOutOfStock ||
                purchasing
              }
              className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {purchasing
                ? "Processing..."
                : isOutOfStock
                  ? "Out of Stock"
                  : "Purchase Vehicle"}
            </button>

            {purchaseMessage && (
              <div className="mt-4 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700">
                {purchaseMessage}
              </div>
            )}

          </div>

        </div>

      </main>

    </div>
  );
};

export default VehicleDetails;