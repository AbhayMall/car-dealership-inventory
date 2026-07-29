import { X } from "lucide-react";
import Button from "./Button";

const ConfirmModal = ({
  title,
  message,
  confirmLabel = "Confirm",
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-surface shadow-2xl">
        <div className="flex items-start justify-between border-b border-border p-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary">{title}</h2>
            <p className="mt-2 text-sm text-text-secondary">{message}</p>
          </div>
          <button
            onClick={onCancel}
            className="rounded-full p-2 text-text-secondary transition hover:bg-surface/50"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:justify-end">
          <Button
            onClick={onCancel}
            variant="secondary"
            className="rounded-2xl px-5 py-3 text-sm font-semibold"
          >
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            variant="danger"
            className="rounded-2xl px-5 py-3 text-sm font-semibold"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
