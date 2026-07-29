const Input = ({
  label,
  id,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error = "",
  onBlur,
}) => {
  const inputId = id || name;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full rounded-xl border px-4 py-3 bg-surface text-text-primary outline-none transition placeholder:text-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 ${error ? 'border-error' : 'border-border'} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      />

      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
