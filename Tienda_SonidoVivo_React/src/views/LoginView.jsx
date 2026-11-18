import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import FormField from '../components/molecules/FormField';
import PasswordInput from '../components/molecules/PasswordInput';

import { useAuth } from '../context/useAuth';
import AuthService from '../services/AuthService'; // Servicio conectado a POST /api/v1/auth/login
import { validarPasswordFormat } from '../utils/validaciones';

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

    try {
      // Autenticación real contra ms-auth vía Traefik (POST /api/v1/auth/login)
      const usuarioSesionObj = await AuthService.login(correoLimpio, pass);

      alert(`¡Hola, ${usuarioSesionObj.nombre}! Le damos la bienvenida al sistema de Sonido Vivo.`);

      // Guardamos en AuthContext y localStorage (incluye el JWT en usuarioSesionObj.token)
      login(usuarioSesionObj);
      navigate('/');
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      alert(mensajeCredenciales);
      setFormData({ correo: '', password: '' });
      document.getElementById("correo")?.focus();
    }
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
              /* Aquí aplicamos nuestras clases en lugar del style en línea */
              className="btn text-white fw-bold px-4 py-2 btn-tema-principal btn-animado"
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
              /* Aquí aplicamos nuestras clases en lugar del style en línea */
              className="btn text-white fw-bold px-4 py-2 text-decoration-none d-inline-block btn-tema-principal btn-animado"
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