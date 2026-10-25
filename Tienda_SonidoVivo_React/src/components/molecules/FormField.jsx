function FormField({ 
  label, 
  id, 
  type = "text", 
  placeholder = "", 
  required = false, 
  value = "", 
  onChange = () => {}, 
  error = "", 
  ...props 
}) {
  return (
    <div className="form-field-group d-flex align-items-center mb-3">
      {label && (
        <label 
          htmlFor={id} 
          className="form-field-label fw-bold mb-0"
        >
          {label}
        </label>
      )}
      <div className="form-field-wrapper">
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={`form-control w-100 ${error ? "is-invalid" : ""}`}
          {...props}
        />
        {error && <div className="invalid-feedback d-block mt-1">{error}</div>}
      </div>
    </div>
  );
}

export default FormField;