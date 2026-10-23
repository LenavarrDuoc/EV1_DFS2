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
    <div className="d-flex align-items-center mb-3" style={{ gap: '10px' }}>
      {label && (
        <label 
          htmlFor={id} 
          className="fw-bold mb-0" 
          style={{ flex: '0 0 35%', maxWidth: '35%', fontSize: '0.95rem' }}
        >
          {label}
        </label>
      )}
      <div style={{ flex: '1 1 auto', minWidth: 0 }}>
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