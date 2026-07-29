import {
  useEffect,
  useState,
} from "react";

import {
  X,
} from "lucide-react";

const EditVehicleModal = ({
  vehicle,
  onClose,
  onVehicleUpdated,
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

  useEffect(() => {

    if (vehicle) {

      setFormData({
        make: vehicle.make || "",
        model: vehicle.model || "",
        category: vehicle.category || "",
        price: vehicle.price || "",
        quantity: vehicle.quantity || "",
        imageUrls: (vehicle.images || []).join(", "),
      });

    }

  }, [vehicle]);

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

    setLoading(true);

    setError("");

    try {

      await onVehicleUpdated(
        vehicle._id,
        {
          ...formData,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
          images: formData.imageUrls
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        }
      );

      onClose();

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to update vehicle."
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
              Edit Vehicle
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update vehicle information.
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

          <div className="grid gap-4 sm:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Make
              </label>

              <input
                name="make"
                value={formData.make}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Model
              </label>

              <input
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

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
              className="min-h-[120px] w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
            />

            <p className="mt-2 text-sm text-gray-500">
              Add one or more image URLs separated by commas.
            </p>
          </div>

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "Updating..."
                : "Update Vehicle"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditVehicleModal;