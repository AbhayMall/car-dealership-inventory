import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    // Only fetch purchases for non-admin users
    if (isAdmin) {
      setLoading(false);
      return;
    }

    const fetchPurchases = async () => {
      try {
        setLoading(true);
        const res = await api.get("/purchases/me");
        setPurchases(res.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load your purchase history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [isAuthenticated, isAdmin]);

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-8">
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-4 max-w-3xl text-gray-600">
          Welcome to AutoVault, your trusted car dealership inventory manager.
          Here you can view your profile, check recent purchases, and manage
          your next vehicle decision with confidence.
        </p>
      </section>

      {!isAuthenticated ? (
        <section className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Welcome back!</h2>
          <p className="mt-3 text-gray-600">
            Sign in to see your profile details, purchase history, and
            personalized recommendations.
          </p>
        </section>
      ) : (
        <>
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-gray-900">About AutoVault</h2>
              <p className="mt-3 text-gray-600">
                AutoVault helps you browse dealership inventory, track your
                purchases, and manage your account from one clean dashboard.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Profile</h2>
              <div className="mt-4 space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Name:</span> {user?.name || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {user?.email || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Role:</span> {user?.role || "User"}
                </p>
              </div>
            </div>

            {/* Only show Purchase Summary for non-admin users */}
            {!isAdmin && (
              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <h2 className="text-xl font-semibold text-gray-900">Purchase Summary</h2>
                <p className="mt-4 text-4xl font-bold text-blue-600">{purchases.length}</p>
                <p className="mt-2 text-gray-600">
                  Total purchases made from your account.
                </p>
              </div>
            )}
          </section>

          {/* Only show Recent Purchases section for non-admin users */}
          {!isAdmin && (
            <section className="rounded-3xl border border-gray-200 bg-white p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Recent Purchases</h2>
                  <p className="mt-2 text-gray-600">
                    Review the latest vehicles you've purchased and their status.
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="mt-6 text-gray-600">Loading purchases...</div>
              ) : error ? (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                  {error}
                </div>
              ) : purchases.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-gray-700">
                  You have not made any purchases yet. Browse the inventory to get started.
                </div>
              ) : (
                <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200">
                  <table className="w-full min-w-full table-auto text-left text-sm text-gray-700">
                    <thead className="bg-gray-50 text-sm font-semibold text-gray-600">
                      <tr>
                        <th className="px-4 py-4">Receipt</th>
                        <th className="px-4 py-4">Vehicle</th>
                        <th className="px-4 py-4">Date</th>
                        <th className="px-4 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.slice(0, 5).map((purchase) => (
                        <tr key={purchase._id} className="border-t border-gray-100">
                          <td className="px-4 py-4">{purchase._id.slice(-6)}</td>
                          <td className="px-4 py-4">
                            {purchase.vehicle?.make} {purchase.vehicle?.model}
                          </td>
                          <td className="px-4 py-4">
                            {new Date(purchase.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4">{purchase.paymentConfirmed ? "Confirmed" : "Pending"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* Optional: Add admin-specific content here */}
          {isAdmin && (
            <section className="rounded-3xl border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-gray-900">Admin Dashboard</h2>
              <p className="mt-3 text-gray-600">
                Welcome to the admin panel. You have access to manage inventory, users, and view all transactions.
              </p>
              {/* Add admin-specific features here */}
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;