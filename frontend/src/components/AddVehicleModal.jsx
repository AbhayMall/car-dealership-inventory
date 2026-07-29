import {
  useState,
} from "react";

import {
  X,
} from "lucide-react";

import Input from "./Input";
import Button from "./Button";

const AddVehicleModal = ({
  onClose,
  onVehicleAdded,
}) => {

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    setLoading(true);

    try {

      await onVehicleAdded({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });

      onClose();

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to add vehicle."
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 p-6">

          <div>

            <h2 className="text-xl font-bold text-gray-900">
              Add New Vehicle
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add a vehicle to your inventory.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {error && (

            <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>

          )}

          <Input
            label="Make"
            name="make"
            value={formData.make}
            onChange={handleChange}
            placeholder="e.g. Toyota"
            required
          />

          <Input
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="e.g. Corolla"
            required
          />

          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Sedan"
            required
          />

          <div className="grid grid-cols-2 gap-4">

            <Input
              label="Price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 20000"
              required
            />

            <Input
              label="Quantity"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g. 5"
              required
            />

          </div>

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading
                ? "Adding..."
                : "Add Vehicle"}
            </Button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddVehicleModal;