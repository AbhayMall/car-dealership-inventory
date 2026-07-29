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

import AdminVehicleTable
  from "../components/AdminVehicleTable";
import AdminPurchasesTable from "../components/AdminPurchasesTable";

import AddVehicleModal
  from "../components/AddVehicleModal";

import ConfirmModal
  from "../components/ConfirmModal";

import EditVehicleModal
  from "../components/EditVehicleModal";

import RestockModal
  from "../components/RestockModal";

import { useToast } from "../context/ToastContext.jsx";

const AdminDashboard = () => {

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [editingVehicle, setEditingVehicle] =
    useState(null);

  const [restockingVehicle, setRestockingVehicle] =
    useState(null);

  const [confirmDeleteVehicle, setConfirmDeleteVehicle] =
    useState(null);

  const [actionLoading, setActionLoading] =
    useState(false);

  const { addToast } = useToast();

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
  };

  const handleRestock = (vehicle) => {
    setRestockingVehicle(vehicle);
  };

  const handleVehicleUpdated = async (
    vehicleId,
    vehicleData
  ) => {

    try {
      setActionLoading(true);

      await api.put(
        `/vehicles/${vehicleId}`,
        vehicleData
      );

      await fetchVehicles();
      addToast("Vehicle updated successfully.");
    } catch (error) {
      addToast(
        error.response?.data?.message ||
          "Unable to update vehicle.",
        "error"
      );
      throw error;
    } finally {
      setActionLoading(false);
    }

  };

  const handleVehicleRestocked = async (
    vehicleId,
    quantity
  ) => {

    try {
      setActionLoading(true);

      await api.post(
        `/vehicles/${vehicleId}/restock`,
        {
          quantity,
        }
      );

      await fetchVehicles();
      addToast("Vehicle restocked successfully.");
    } catch (error) {
      addToast(
        error.response?.data?.message ||
          "Unable to restock vehicle.",
        "error"
      );
      throw error;
    } finally {
      setActionLoading(false);
    }

  };

  const handleAddVehicle = async (
    vehicleData
  ) => {

    try {
      setActionLoading(true);

      await api.post(
        "/vehicles",
        vehicleData
      );

      await fetchVehicles();
      addToast("Vehicle added successfully.");
    } catch (error) {
      addToast(
        error.response?.data?.message ||
          "Unable to add vehicle.",
        "error"
      );
      throw error;
    } finally {
      setActionLoading(false);
    }

  };

  const [vehicles, setVehicles] =
    useState([]);

  const [purchases, setPurchases] = useState([]);
  const [loadingPurchases, setLoadingPurchases] = useState(false);
  const [confirmingPurchase, setConfirmingPurchase] = useState(false);

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
    fetchPurchases();

  }, []);

  const fetchPurchases = async () => {
    try {
      setLoadingPurchases(true);
      const res = await api.get('/purchases');
      setPurchases(res.data);
    } catch (err) {
      console.error(err);
      addToast(err.response?.data?.message || 'Unable to load purchases', 'error');
    } finally {
      setLoadingPurchases(false);
    }
  };

  const handleDownloadReceipt = async (id) => {
    try {
      const res = await api.get(`/purchases/${id}/receipt`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `receipt-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error(err);
      addToast(err.response?.data?.message || 'Unable to download receipt', 'error');
    }
  };

  const handleConfirmPurchase = async (id) => {
    try {
      setConfirmingPurchase(true);
      await api.put(`/purchases/${id}/confirm`);
      addToast('Payment confirmed.');
      await fetchPurchases();
    } catch (err) {
      console.error(err);
      addToast(err.response?.data?.message || 'Unable to confirm payment', 'error');
    } finally {
      setConfirmingPurchase(false);
    }
  };

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

  const handleDelete = async (vehicle) => {
    setConfirmDeleteVehicle(vehicle);
  };

  const handleConfirmDelete = async () => {
    if (!confirmDeleteVehicle) return;

    try {
      setActionLoading(true);

      await api.delete(
        `/vehicles/${confirmDeleteVehicle._id}`
      );

      await fetchVehicles();
      addToast("Vehicle deleted successfully.");
    } catch (error) {
      addToast(
        error.response?.data?.message ||
          "Unable to delete vehicle.",
        "error"
      );
    } finally {
      setActionLoading(false);
      setConfirmDeleteVehicle(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteVehicle(null);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}

      <section className="border-b border-border bg-surface">

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <p className="font-semibold text-primary">
                ADMIN PANEL
              </p>

              <h1 className="mt-2 text-3xl font-bold text-text-primary">
                Inventory Dashboard
              </h1>

              <p className="mt-2 text-text-secondary">
                Manage vehicles and monitor your dealership inventory.
              </p>

            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={fetchVehicles}
                              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 font-semibold text-text-primary transition hover:bg-surface/50"
              >
                <RefreshCw size={18} />
                Refresh
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-hover"
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
                            className="h-96 animate-pulse rounded-2xl bg-surface/50"
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

              <div className="mt-6">
                <AdminVehicleTable
                  vehicles={vehicles}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onRestock={handleRestock}
                />
              </div>

            )}

            {/* Purchases */}

            <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <div>
                              <h2 className="text-xl font-bold text-text-primary">Recent Purchases</h2>
                              <p className="mt-1 text-sm text-text-secondary">View and confirm purchase payments.</p>
                </div>
                <div>
                              <button onClick={fetchPurchases} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold">Refresh</button>
                </div>
              </div>

              <div className="mt-6">
                <AdminPurchasesTable purchases={purchases} onDownload={handleDownloadReceipt} onConfirm={handleConfirmPurchase} loadingConfirm={confirmingPurchase} />
              </div>
            </div>

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

      {editingVehicle && (

        <EditVehicleModal
          vehicle={editingVehicle}
          onClose={() =>
            setEditingVehicle(null)
          }
          onVehicleUpdated={
            handleVehicleUpdated
          }
        />

      )}

      {restockingVehicle && (

        <RestockModal
          vehicle={restockingVehicle}
          onClose={() =>
            setRestockingVehicle(null)
          }
          onRestocked={
            handleVehicleRestocked
          }
        />

      )}

      {confirmDeleteVehicle && (

        <ConfirmModal
          title="Delete vehicle"
          message={`Are you sure you want to delete ${confirmDeleteVehicle.make} ${confirmDeleteVehicle.model}?`}
          confirmLabel={actionLoading ? "Deleting..." : "Delete"}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
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
    <div className="rounded-2xl border border-border bg-surface p-6">

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