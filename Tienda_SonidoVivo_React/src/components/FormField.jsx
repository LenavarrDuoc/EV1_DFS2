import React from 'react';

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
    <div className="campo">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={error ? "input-error" : ""}
        {...props}
      />
      {error && <span className="error-texto" style={{ color: "red" }}>{error}</span>}
    </div>
  );
}

export default FormField;