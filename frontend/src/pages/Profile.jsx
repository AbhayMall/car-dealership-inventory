import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Button from "../components/Button";

const Profile = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await api.get('/purchases/me');
        setPurchases(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load purchases');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const handleDownload = async (id) => {
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
      alert(err.response?.data?.message || 'Unable to download receipt');
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold">Account</h2>
        <p className="mt-2">Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">My Purchases</h2>

        {loading && <div className="p-4">Loading...</div>}
              {error && <div className="p-4 text-error">{error}</div>}

        {!loading && purchases.length === 0 && (
                <div className="mt-4 rounded-xl border border-border bg-surface p-6">You have no purchases yet.</div>
        )}

        {!loading && purchases.length > 0 && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface">
            <table className="w-full table-auto">
                    <thead className="bg-surface/50 text-left text-sm font-medium text-text-secondary">
                <tr>
                  <th className="px-4 py-3">Receipt</th>
                  <th className="px-4 py-3">Vehicle</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
                    <tbody className="text-sm text-text-primary">
                {purchases.map((p) => (
                  <tr key={p._id} className="border-t">
                    <td className="px-4 py-3">{p._id.slice(-6)}</td>
                    <td className="px-4 py-3">{p.vehicle?.make} {p.vehicle?.model}</td>
                    <td className="px-4 py-3">{new Date(p.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3">{p.paymentConfirmed ? 'Confirmed' : 'Pending'}</td>
                    <td className="px-4 py-3"><Button onClick={() => handleDownload(p._id)}>Download Receipt</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
