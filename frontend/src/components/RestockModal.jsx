import {
  useState,
} from "react";

import {
  X,
} from "lucide-react";

const RestockModal = ({
  vehicle,
  onClose,
  onRestocked,
}) => {

  const [quantity, setQuantity] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (
      !quantity ||
      Number(quantity) <= 0
    ) {

      setError(
        "Enter a quantity greater than zero."
      );

      return;

    }

    setLoading(true);

    setError("");

    try {

      await onRestocked(
        vehicle._id,
        Number(quantity)
      );

      onClose();

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to restock vehicle."
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-gray-200 p-6">

          <div>

            <h2 className="text-xl font-bold">
              Restock Vehicle
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {vehicle.make} {vehicle.model}
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6"
        >

          <div className="rounded-xl bg-gray-50 p-4">

            <p className="text-sm text-gray-500">
              Current Stock
            </p>

            <p className="mt-1 text-2xl font-bold">
              {vehicle.quantity}
            </p>

          </div>

          <div className="mt-5">

            <label className="mb-2 block text-sm font-medium">
              Quantity to Add
            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) =>
                setQuantity(
                  event.target.value
                )
              }
              placeholder="Enter quantity"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          {error && (

            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>

          )}

          <div className="mt-6 flex gap-3">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 px-5 py-3 font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading
                ? "Restocking..."
                : "Restock"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default RestockModal;