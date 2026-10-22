import React, { useState } from 'react';

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
    <div className="campo">
      <label htmlFor={inputId}>{labelText}</label>
      <div className="password-wrapper">
        <input
          type={mostrarPassword ? 'text' : 'password'}
          id={inputId}
          name={inputId}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={error ? 'input-error' : ''}
        />
        <button
          type="button"
          className="btn-toggle-pass"
          aria-label="Mostrar u ocultar contraseña"
          onClick={() => setMostrarPassword((prev) => !prev)}
          style={{ width: 'min-content', height: 'min-content' }}
        >
          {mostrarPassword ? '🙈' : '👁️'}
        </button>
      </div>
      {error && <span className="error-texto" style={{ color: 'red' }}>{error}</span>}
    </div>
  );
}

export default PasswordInput;