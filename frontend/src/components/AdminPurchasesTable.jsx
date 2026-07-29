import Button from "./Button";
import { Link } from "react-router-dom";

const AdminPurchasesTable = ({ purchases, onDownload, onConfirm, loadingConfirm }) => {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <table className="w-full table-auto">
        <thead className="bg-gray-50 text-left text-sm font-medium text-gray-600">
          <tr>
            <th className="px-4 py-3">Receipt</th>
            <th className="px-4 py-3">Vehicle</th>
            <th className="px-4 py-3">Buyer</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Age</th>
            <th className="px-4 py-3">Payment</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          {purchases.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="px-4 py-3">{p._id.slice(-6)}</td>
              <td className="px-4 py-3">{p.vehicle?.make} {p.vehicle?.model}</td>
              <td className="px-4 py-3">{p.buyerName || p.user?.name || '-'}</td>
              <td className="px-4 py-3">{p.phone || '-'}</td>
              <td className="px-4 py-3">{p.age || '-'}</td>
              <td className="px-4 py-3">{p.paymentMethod}</td>
              <td className="px-4 py-3">{p.paymentConfirmed ? 'Confirmed' : 'Pending'}</td>
              <td className="px-4 py-3">{new Date(p.createdAt).toLocaleString()}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Link to={`/admin/purchases/${p._id}`} className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700">View</Link>
                  <Button onClick={() => onDownload(p._id)}>Download</Button>
                  {!p.paymentConfirmed && (
                    <Button onClick={() => onConfirm(p._id)} disabled={loadingConfirm}>
                      {loadingConfirm ? 'Confirming...' : 'Confirm'}
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPurchasesTable;
