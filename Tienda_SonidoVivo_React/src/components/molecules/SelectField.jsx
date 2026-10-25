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
    <div className="select-field-group d-flex align-items-center mb-3">
      {label && (
        <label 
          htmlFor={id} 
          className="select-field-label fw-bold mb-0"
        >
          {label}
        </label>
      )}
      <div className="select-field-wrapper">
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