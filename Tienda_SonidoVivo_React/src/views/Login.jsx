import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormField from '../components/FormField';
import PasswordInput from '../components/PasswordInput';
import { itemsFooter } from '../data/footer';

function Login() {
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    // Si no encuentra id, usa name, y si no, asigna string vacío para no romper el objeto
    const key = id || name;
    if (!key) return;

    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de inicio de sesión:", formData);
  };

  return (
    <>
      <Header />
      
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

      <Footer itemsFooter={itemsFooter} />
    </>
  );
}

export default Login;