import { useState } from "react";
import { X } from "lucide-react";
import Button from "./Button";

const PurchaseModal = ({ vehicle, onClose, onPurchased }) => {
  const [form, setForm] = useState({
    buyerName: "",
    phone: "",
    aadhar: "",
    location: "",
    age: "",
    drivingLicense: "",
    paymentMethod: "cash",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.age || Number(form.age) < 21) {
      setError("Buyer must be at least 21 years old to purchase.");
      return;
    }

    if (!form.drivingLicense) {
      setError("Driving license is required.");
      return;
    }

    setLoading(true);

    try {
      await onPurchased(form);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Purchase failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-xl font-bold">Purchase Vehicle</h2>
            <p className="mt-1 text-sm text-gray-500">Provide buyer details to complete purchase.</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}

          <div className="grid gap-3 sm:grid-cols-2">
            <input name="buyerName" value={form.buyerName} onChange={handleChange} placeholder="Full name" className="rounded-xl border p-3" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" className="rounded-xl border p-3" />
            <input name="aadhar" value={form.aadhar} onChange={handleChange} placeholder="Aadhar number" className="rounded-xl border p-3" />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="rounded-xl border p-3" />
            <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" className="rounded-xl border p-3" />
            <input name="drivingLicense" value={form.drivingLicense} onChange={handleChange} placeholder="Driving license number" className="rounded-xl border p-3" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Payment Method</label>
            <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="w-full rounded-xl border p-3">
              <option value="cash">Cash (pay on delivery)</option>
              <option value="card">Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-gray-200 px-5 py-3">Cancel</button>
            <Button type="submit" className="flex-1" disabled={loading}>{loading? 'Processing...':'Confirm Purchase'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal;
