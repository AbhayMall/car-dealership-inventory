import { useEffect, useState } from "react";
import api from "../services/api";
import Button from "../components/Button";

const MyPurchases = () => {
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
        setError(err.response?.data?.message || 'Unable to load purchases.');
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
      alert(err.response?.data?.message || 'Unable to download receipt.');
    }
  };

  if (loading) return <div className="p-6">Loading purchases...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-bold">My Purchases</h1>

      {purchases.length === 0 ? (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">You have no purchases yet.</div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 text-left text-sm font-medium text-gray-600">
              <tr>
                <th className="px-4 py-3">Receipt</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {purchases.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="px-4 py-3">{p._id.slice(-6)}</td>
                  <td className="px-4 py-3">{p.vehicle?.make} {p.vehicle?.model}</td>
                  <td className="px-4 py-3">{new Date(p.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3">{p.paymentMethod} / {p.paymentConfirmed ? 'Confirmed' : 'Pending'}</td>
                  <td className="px-4 py-3">
                    <Button onClick={() => handleDownload(p._id)}>Download Receipt</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPurchases;
