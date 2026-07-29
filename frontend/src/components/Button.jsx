const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  variant = "primary", // primary | secondary | ghost | danger | success
  className = "",
  ariaLabel,
}) => {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-hover focus:ring-primary",
    secondary:
      "bg-surface border border-border text-text-primary hover:bg-gray-50 focus:ring-primary/30",
    ghost:
      "bg-transparent text-primary hover:bg-primary/10 focus:ring-primary/30",
    danger:
      "bg-error text-white hover:bg-red-600 focus:ring-error/30",
    success:
      "bg-success text-white hover:bg-green-600 focus:ring-success/30",
  };

  const cls = `${base} ${variants[variant] || variants.primary} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={cls}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}

      <span className={loading ? "opacity-90" : ""}>
        {children}
      </span>
    </button>
  );
};

export default Button;
