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
    imageUrls: "",
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
        images: formData.imageUrls
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
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

      <div className="w-full max-w-lg rounded-2xl bg-surface shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-border p-6">

          <div>

            <h2 className="text-xl font-bold text-text-primary">
              Add New Vehicle
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              Add a vehicle to your inventory.
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

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {error && (

                      <div className="rounded-xl bg-error/10 p-4 text-sm text-error">
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

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Image URLs
            </label>
            <textarea
              name="imageUrls"
              value={formData.imageUrls}
              onChange={handleChange}
              placeholder="Enter image URLs separated by commas"
                          className="min-h-[120px] w-full rounded-xl border border-border bg-transparent px-4 py-3 text-text-primary outline-none focus:border-primary"
                          aria-label="Image URLs"
                        />
            <p className="mt-2 text-sm text-text-secondary">
              Add one or more image URLs separated by commas.
            </p>
          </div>

          <div className="flex gap-3 pt-2">

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
                        className="flex-1"
                      >
                        Add Vehicle
            </Button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddVehicleModal;