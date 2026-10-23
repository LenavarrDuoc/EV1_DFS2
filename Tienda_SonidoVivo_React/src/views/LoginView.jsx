import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormField from '../components/molecules/FormField';
import PasswordInput from '../components/molecules/PasswordInput';

import { useAuth } from '../context/AuthContext'; // Importamos el contexto
import { encriptarPassword, validarPasswordFormat } from '../utils/validaciones';

function LoginView() {
  
  const navigate = useNavigate();
  const { login } = useAuth(); // Extraemos la función login

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

    // 1. Validar correo
    const dominioValido =
      correoLimpio.endsWith(".com") ||
      correoLimpio.endsWith(".cl") ||
      correoLimpio.endsWith(".org");

    if (!dominioValido) {
      alert("Debe ingresar un correo válido");
      document.getElementById("correo")?.focus();
      return;
    }

    // 2. Validar formato de contraseña
    const errorPassword = validarPasswordFormat(pass);
    if (errorPassword) {
      alert(errorPassword);
      document.getElementById("password")?.focus();
      return;
    }

    // 3. Consultar usuarios registrados
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

    // 4. Encriptación y comprobación de hash
    const passwordHash = await encriptarPassword(pass);

    if (passwordHash !== usuarioEncontrado.password) {

      alert(mensajeCredenciales);
      
      setFormData({ correo: '', password: '' });
      document.getElementById("password")?.focus();

      return;
    }

    // 5. Éxito: Sincronizar con AuthContext
    alert(`¡Hola, ${usuarioEncontrado.nombre}! Le damos la bienvenida al sistema de Sonido Vivo.`);

    const usuarioSesionObj = { ...usuarioEncontrado };
    delete usuarioSesionObj.password;

    // Invocación del contexto global
    login(usuarioSesionObj);

    navigate('/');
  };

  return (
    <main>
      <form id="formulario-login" onSubmit={handleSubmit}>
        <fieldset className="grid-formulario">
          <legend className="legend-titulo-fieldset">Iniciar Sesión</legend>

          <FormField 
            label="Correo E:" 
            id="correo" 
            type="email" 
            placeholder="ej: xxxxx@xxxxx.com" 
            required 
            value={formData.correo}
            onChange={handleChange}
          />

          <PasswordInput 
            inputId="password" 
            labelText="Contraseña:" 
            required 
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" id="btn-login">Ingresar</button>
        </fieldset>
      </form>
    </main>
  );
}

export default LoginView;