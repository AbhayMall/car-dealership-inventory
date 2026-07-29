import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Button from "../components/Button";

const AdminPurchaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/purchases/${id}`);
        setPurchase(res.data);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Unable to load purchase');
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleDownload = async () => {
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

  const handleConfirm = async () => {
    try {
      setConfirming(true);
      await api.put(`/purchases/${id}/confirm`);
      const res = await api.get(`/purchases/${id}`);
      setPurchase(res.data);
      alert('Payment confirmed');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Unable to confirm payment');
    } finally {
      setConfirming(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!purchase) return null;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold">Purchase Details</h1>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Buyer</h3>
            <p className="mt-2 font-semibold">{purchase.buyerName || purchase.user?.name || '-'}</p>
            <p className="text-sm text-gray-600">Phone: {purchase.phone || '-'}</p>
            <p className="text-sm text-gray-600">Aadhar: {purchase.aadhar || '-'}</p>
            <p className="text-sm text-gray-600">Location: {purchase.location || '-'}</p>
            <p className="text-sm text-gray-600">Age: {purchase.age || '-'}</p>
            <p className="text-sm text-gray-600">Driving License: {purchase.drivingLicense || '-'}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Vehicle</h3>
            <p className="mt-2 font-semibold">{purchase.vehicle?.make} {purchase.vehicle?.model}</p>
            <p className="text-sm text-gray-600">Category: {purchase.vehicle?.category}</p>
            <p className="text-sm text-gray-600">Price: £{purchase.vehicle?.price}</p>
            <p className="text-sm text-gray-600">Purchased: {new Date(purchase.createdAt).toLocaleString()}</p>
            <p className="text-sm text-gray-600">Payment: {purchase.paymentMethod} / {purchase.paymentConfirmed ? 'Confirmed' : 'Pending'}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button onClick={handleDownload}>Download Receipt</Button>
          {!purchase.paymentConfirmed && (
            <Button onClick={handleConfirm} disabled={confirming}>{confirming ? 'Confirming...' : 'Confirm Payment'}</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPurchaseDetail;
