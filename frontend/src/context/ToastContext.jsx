import { createContext, useContext, useMemo, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now().toString();
    setToasts((previous) => [
      ...previous,
      { id, message, type },
    ]);

    window.setTimeout(() => {
      setToasts((previous) =>
        previous.filter((toast) => toast.id !== id)
      );
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((previous) =>
      previous.filter((toast) => toast.id !== id)
    );
  };

  const value = useMemo(
    () => ({ addToast, removeToast }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`w-full max-w-sm rounded-2xl border px-4 py-3 shadow-xl transition duration-300 ${
              toast.type === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-blue-200 bg-blue-50 text-blue-700"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium">
                {toast.message}
              </p>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-sm font-semibold text-current opacity-60 transition hover:opacity-100"
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
