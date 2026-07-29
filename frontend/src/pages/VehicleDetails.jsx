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
import PurchaseModal from "../components/PurchaseModal";
import Button from "../components/Button";

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

  const [purchasing, setPurchasing] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const handlePurchase = () => {
    setShowPurchaseModal(true);
  };

  const handlePurchaseSubmit = async (buyerInfo) => {
    setPurchasing(true);
    setPurchaseMessage("");

    try {
      const response = await api.post(
        `/vehicles/${id}/purchase`,
        buyerInfo
      );

      const purchase = response.data.purchase;

      // refresh vehicle info
      const vehicleResp = await api.get(`/vehicles/${id}`);
      setVehicle(vehicleResp.data.vehicle || vehicleResp.data);

      // download receipt
      if (purchase && purchase._id) {
        const receiptResp = await api.get(`/purchases/${purchase._id}/receipt`, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([receiptResp.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `receipt-${purchase._id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      }

      setPurchaseMessage("Purchase created successfully.");

    } catch (error) {
      setPurchaseMessage(error.response?.data?.message || "Purchase failed.");
      throw error;
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
    <div className="min-h-screen bg-background">

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <button
          onClick={() => navigate(-1)}
                  className="mb-8 flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="grid overflow-hidden rounded-3xl border border-border bg-surface shadow-sm lg:grid-cols-2">

          {/* Visual */}

          <div className="flex min-h-[500px] items-center justify-center bg-surface/50">
            {vehicle.images && vehicle.images.length > 0 ? (
              <div className="relative w-full overflow-hidden rounded-3xl">
                <img
                  src={vehicle.images[0]}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="h-[500px] w-full object-cover"
                />
              </div>
            ) : (
              <Car
                size={220}
                strokeWidth={1}
                className="text-gray-400"
              />
            )}
          </div>

          {/* Details */}

          <div className="p-8 sm:p-12">

            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              {vehicle.category}
            </span>

            <p className="mt-8 text-lg font-semibold text-primary">
              {vehicle.make}
            </p>

            <h1 className="mt-2 text-4xl font-bold text-text-primary">
              {vehicle.model}
            </h1>

            <p className="mt-6 text-3xl font-bold text-text-primary">
              £{Number(vehicle.price).toLocaleString("en-GB")}
            </p>

            <div className="my-8 h-px bg-border" />

            <div className="grid gap-5 lg:grid-cols-3">

                          <div className="rounded-3xl bg-surface p-6">

                            <p className="text-sm text-text-secondary">
                  Category
                </p>

                            <p className="mt-2 text-xl font-semibold text-text-primary">
                  {vehicle.category}
                </p>

              </div>

                          <div className="rounded-3xl bg-surface p-6">

                            <p className="text-sm text-text-secondary">
                  Available
                </p>

                            <p className="mt-2 text-xl font-semibold text-text-primary">
                  {vehicle.quantity}
                </p>

              </div>

                          <div className="rounded-3xl bg-surface p-6">

                            <p className="text-sm text-text-secondary">
                  Images
                </p>

                            <p className="mt-2 text-xl font-semibold text-text-primary">
                  {vehicle.images?.length || 0}
                </p>

              </div>

            </div>

            <div className="mt-8 flex items-center gap-3">

              {isOutOfStock ? (
                <>
                                <Package className="text-error" />

                                <p className="font-medium text-error">
                    Currently out of stock
                  </p>
                </>
              ) : (
                <>
                                <CheckCircle className="text-success" />

                                <p className="font-medium text-success">
                    Available for purchase
                  </p>
                </>
              )}

            </div>

            <Button
                          onClick={handlePurchase}
                          disabled={isOutOfStock || purchasing}
                          loading={purchasing}
                          className="mt-8 w-full"
                        >
                          {isOutOfStock ? "Out of Stock" : "Purchase Vehicle"}
                        </Button>

            {purchaseMessage && (
              <div className="mt-4 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700">
                {purchaseMessage}
              </div>
            )}

            {showPurchaseModal && (
              <PurchaseModal
                vehicle={vehicle}
                onClose={() => setShowPurchaseModal(false)}
                onPurchased={handlePurchaseSubmit}
              />
            )}

          </div>

        </div>

      </main>

    </div>
  );
};

export default VehicleDetails;