import { useState } from 'react';

function PasswordInput({ 
  inputId = 'contrasena', 
  labelText = 'Contraseña:', 
  placeholder = '', 
  required = false,
  value = '',              
  onChange = () => {},     
  error = ''
}) {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  return (
    <div className="password-input-group d-flex align-items-center mb-3">
      {labelText && (
        <label 
          htmlFor={inputId} 
          className="password-label fw-bold mb-0"
        >
          {labelText}
        </label>
      )}
      <div className="password-wrapper">
        <div className="input-group w-100">
          <input
            type={mostrarPassword ? 'text' : 'password'}
            id={inputId}
            name={inputId}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
            className={`form-control ${error ? 'is-invalid' : ''}`}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            aria-label="Mostrar u ocultar contraseña"
            onClick={() => setMostrarPassword((prev) => !prev)}
          >
            {mostrarPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {error && <div className="invalid-feedback d-block mt-1">{error}</div>}
      </div>
    </div>
  );
}

export default PasswordInput;