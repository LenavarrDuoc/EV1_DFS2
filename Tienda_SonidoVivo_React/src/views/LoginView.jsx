import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import FormField from '../components/molecules/FormField';
import PasswordInput from '../components/molecules/PasswordInput';

import { useAuth } from '../context/AuthContext';
import { encriptarPassword, validarPasswordFormat } from '../utils/validaciones';

function LoginView() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    const key = id || name;
    if (!key) return;

    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const correoLimpio = formData.correo.trim().toLowerCase();
    const pass = formData.password;
    const mensajeCredenciales = "Credenciales de Usuario y/o Contraseña inválidas.";

    if (!correoLimpio.endsWith(".com") && !correoLimpio.endsWith(".cl") && !correoLimpio.endsWith(".org")) {
      alert("Debe ingresar un correo válido");
      document.getElementById("correo")?.focus();
      return;
    }

    const errorPassword = validarPasswordFormat(pass);
    if (errorPassword) {
      alert(errorPassword);
      document.getElementById("password")?.focus();
      return;
    }

    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuariosRegistrados.find(
      (u) => u.correo.toLowerCase() === correoLimpio
    );

    if (!usuarioEncontrado) {
      alert(mensajeCredenciales);
      setFormData({ correo: '', password: '' });
      document.getElementById("correo")?.focus();
      return;
    }

    const passwordHash = await encriptarPassword(pass);

    if (passwordHash !== usuarioEncontrado.password) {
      alert(mensajeCredenciales);
      setFormData({ correo: '', password: '' });
      document.getElementById("password")?.focus();
      return;
    }

    alert(`¡Hola, ${usuarioEncontrado.nombre}! Le damos la bienvenida al sistema de Sonido Vivo.`);

    const usuarioSesionObj = { ...usuarioEncontrado };
    delete usuarioSesionObj.password;

    login(usuarioSesionObj);
    navigate('/');
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center w-100 my-5 px-3"
      style={{ minHeight: '60vh' }}
    >
      <form 
        id="formulario-login" 
        onSubmit={handleSubmit} 
        noValidate
        style={{ maxWidth: '520px', width: '100%' }}
      >
        <fieldset 
          className="border border-secondary-subtle p-4 rounded-3 shadow-sm w-100" 
          style={{ backgroundColor: 'rgba(226, 234, 198, 0.5)' }}
        >
          <legend className="float-none w-auto px-2 fs-6 fw-bold text-dark text-center">
            Ingrese datos de inicio de sesión:
          </legend>

          <FormField 
            label="Correo E:" 
            id="correo" 
            type="email" 
            placeholder="ej: usuario@dominio.com" 
            required 
            value={formData.correo}
            onChange={handleChange}
          />

          <PasswordInput 
            inputId="password" 
            labelText="Contraseña:" 
            placeholder="Ingrese su contraseña"
            required 
            value={formData.password}
            onChange={handleChange}
          />

          <div className="d-flex justify-content-center mt-3">
            <button 
              type="submit" 
              id="btn-login"
              className="btn text-white fw-bold px-4 py-2"
              style={{ backgroundColor: 'var(--color_3)', borderColor: 'var(--color_3)' }}
            >
              Iniciar Sesión
            </button>
          </div>

          <hr className="my-4 text-secondary-subtle" />

          <div className="text-center">
            <p className="mb-2 fw-semibold text-dark">
              Aún no estoy registrado:
            </p>
            <Link 
              to="/registro" 
              id="btn-ir-registro"
              className="btn text-white fw-bold px-4 py-2 text-decoration-none d-inline-block"
              style={{ backgroundColor: 'var(--color_3)', borderColor: 'var(--color_3)' }}
            >
              Registrarse
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default LoginView;