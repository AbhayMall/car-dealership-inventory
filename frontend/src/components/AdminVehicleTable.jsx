import {
  Edit,
  PackagePlus,
  Trash2,
} from "lucide-react";

const AdminVehicleTable = ({
  vehicles,
  onEdit,
  onDelete,
  onRestock,
}) => {

  if (vehicles.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
        <p className="text-gray-500">
          No vehicles found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[800px]">

          <thead className="border-b border-gray-200 bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Vehicle
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Stock
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

            {vehicles.map((vehicle) => {

              const isOutOfStock =
                vehicle.quantity === 0;

              return (
                <tr
                  key={vehicle._id}
                  className="transition hover:bg-gray-50"
                >

                  {/* Vehicle */}

                  <td className="px-6 py-5">

                    <div>

                      <p className="font-semibold text-gray-900">
                        {vehicle.make}
                      </p>

                      <p className="text-sm text-gray-500">
                        {vehicle.model}
                      </p>

                    </div>

                  </td>

                  {/* Category */}

                  <td className="px-6 py-5">

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {vehicle.category}
                    </span>

                  </td>

                  {/* Price */}

                  <td className="px-6 py-5 font-medium text-gray-900">

                    Rs.{Number(vehicle.price).toLocaleString("en-GB")}

                  </td>

                  {/* Stock */}

                  <td className="px-6 py-5 font-medium text-gray-900">

                    {vehicle.quantity}

                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isOutOfStock
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {isOutOfStock
                        ? "Out of Stock"
                        : "Available"}
                    </span>

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex justify-end gap-2">

                      {/* Edit */}

                      <button
                        onClick={() =>
                          onEdit(vehicle)
                        }
                        title="Edit vehicle"
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Edit size={18} />
                      </button>

                      {/* Restock */}

                      <button
                        onClick={() =>
                          onRestock(vehicle)
                        }
                        title="Restock vehicle"
                        className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                      >
                        <PackagePlus size={18} />
                      </button>

                      {/* Delete */}

                      <button
                        onClick={() =>
                          onDelete(vehicle)
                        }
                        title="Delete vehicle"
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>
              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminVehicleTable;