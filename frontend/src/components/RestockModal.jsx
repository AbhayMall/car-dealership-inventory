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

      <div className="w-full max-w-md rounded-2xl bg-surface shadow-2xl">

        <div className="flex items-center justify-between border-b border-border p-6">

          <div>

            <h2 className="text-xl font-bold text-text-primary">
              Restock Vehicle
            </h2>

                        <p className="mt-1 text-sm text-text-secondary">
              {vehicle.make} {vehicle.model}
            </p>

          </div>

          <button
            onClick={onClose}
                      className="rounded-lg p-2 text-text-secondary hover:bg-surface/50"
                      aria-label="Close"
                    >
                      <X size={20} />
                    </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6"
        >

          <div className="rounded-xl bg-surface/50 p-4">

                      <p className="text-sm text-text-secondary">
              Current Stock
            </p>

                      <p className="mt-1 text-2xl font-bold text-text-primary">
              {vehicle.quantity}
            </p>

          </div>

          <div className="mt-5">

            <label className="mb-2 block text-sm font-medium text-text-primary">
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
                          className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-text-primary outline-none focus:border-primary"
                          aria-label="Quantity to add"
                        />

          </div>

          {error && (

                      <p className="mt-3 text-sm text-error">
              {error}
            </p>

          )}

          <div className="mt-6 flex gap-3">

                      <Button
              type="button"
                        variant="secondary"
                        onClick={onClose}
                        className="flex-1"
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        disabled={loading}
                        loading={loading}
                        variant="success"
                        className="flex-1"
                      >
                        Restock
                      </Button>

                    </div>

        </form>

      </div>

    </div>
  );
};

export default RestockModal;