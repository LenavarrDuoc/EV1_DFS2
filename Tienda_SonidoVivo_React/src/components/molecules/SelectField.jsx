function SelectField({ 
  label, 
  id, 
  required = false, 
  value = "", 
  onChange = () => {}, 
  options = [], 
  defaultOptionText = "Seleccione una opción",
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
        <select
          id={id}
          name={id}
          required={required}
          value={value}
          onChange={onChange}
          className={`form-select w-100 ${error ? "is-invalid" : ""}`}
          {...props}
        >
          <option value="" disabled>
            {defaultOptionText}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <div className="invalid-feedback d-block mt-1">{error}</div>}
      </div>
    </div>
  );
}

export default SelectField;