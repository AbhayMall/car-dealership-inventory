import { useState } from "react";
import { X } from "lucide-react";
import Button from "./Button";
import Input from "./Input";

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
      <div className="w-full max-w-lg rounded-2xl bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Purchase Vehicle</h2>
            <p className="mt-1 text-sm text-text-secondary">Provide buyer details to complete purchase.</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-text-secondary hover:bg-surface/50" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {error && <div className="rounded-xl bg-error/10 p-3 text-sm text-error">{error}</div>}

          <div className="grid gap-3 sm:grid-cols-2">
            <Input name="buyerName" label="Full name" value={form.buyerName} onChange={handleChange} />
            <Input name="phone" label="Phone number" value={form.phone} onChange={handleChange} />
            <Input name="aadhar" label="Aadhar number" value={form.aadhar} onChange={handleChange} />
            <Input name="location" label="Location" value={form.location} onChange={handleChange} />
            <Input name="age" label="Age" type="number" value={form.age} onChange={handleChange} />
            <Input name="drivingLicense" label="Driving license number" value={form.drivingLicense} onChange={handleChange} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">Payment Method</label>
            <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="w-full rounded-xl border border-border bg-transparent px-3 py-2 text-text-primary">
              <option value="cash">Cash (pay on delivery)</option>
              <option value="card">Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1" disabled={loading} loading={loading}>Confirm Purchase</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal;
