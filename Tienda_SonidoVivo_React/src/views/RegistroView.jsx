import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormField from '../components/molecules/FormField';
import PasswordInput from '../components/molecules/PasswordInput';
import SelectField from '../components/molecules/SelectField';
import { Usuario } from '../models/Usuario';
import { validarRegistro, validarCampo, encriptarPassword } from '../utils/validaciones';

function RegistroView() {
  const navigate = useNavigate();

  const comunasRM = [
    "Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina",
    "Conchalí", "Curacaví", "El Bosque", "El Monte", "Estación Central", "Huechuraba",
    "Independencia", "Isla de Maipo", "La Cisterna", "La Florida", "La Granja",
    "La Pintana", "La Reina", "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo",
    "Lo Prado", "Macul", "Maipú", "María Pinto", "Melipilla", "Ñuñoa",
    "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén",
    "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal",
    "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo",
    "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", "Til Til", "Vitacura"
  ];

  const estilosMusicales = [
    "Rock", "Pop", "Jazz", "Blues", "Metal", "Hip Hop / Rap",
    "Reggae", "Música Clásica", "Música Electrónica", "Folclore / Tradicional",
    "Funk / Soul", "Latina / Salsa / Cumbia"
  ];

  const categoriasInstrumentos = [
    "Cuerdas (Guitarras, Bajos, Violines, etc.)",
    "Percusión (Baterías, Percusión latina, etc.)",
    "Viento Madera (Saxofones, Flautas, Clarinetes, etc.)",
    "Viento Metal (Trompetas, Trombones, Tubas, etc.)",
    "Teclados y Pianos (Teclados, Pianos, Sintetizadores)",
    "Equipos de Audio / Djing (Micrófonos, Interfaces, Mezcladoras)",
    "Accesorios Musicales"
  ];

  const [formData, setFormData] = useState({
    nombre: '',
    run: '',
    correo: '',
    telefono: '',
    fecNac: '',
    direccion: '',
    comuna: '',
    estiloMusical: '',
    categoriaInstrumento: '',
    password: '',
    repeatPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    const key = id || name;
    if (!key) return;

    const updatedFormData = {
      ...formData,
      [key]: value
    };

    setFormData(updatedFormData);

    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const mensajeError = validarCampo(key, value, updatedFormData, usuariosRegistrados);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: mensajeError
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const error = validarRegistro(formData, usuariosRegistrados);

    if (error) {
      setErrors((prev) => ({ ...prev, [error.campo]: error.mensaje }));
      alert(error.mensaje);

      const elementoConError = document.getElementById(error.campo);
      if (elementoConError) {
        elementoConError.focus();
      }
      return;
    }

    try {
      setIsSubmitting(true);

      const passwordEncriptada = await encriptarPassword(formData.password);

      const uMock = new Usuario(
        formData.nombre,
        formData.run,
        formData.correo,
        formData.telefono,
        formData.fecNac,
        formData.direccion,
        formData.comuna,
        formData.estiloMusical,
        formData.categoriaInstrumento,
        passwordEncriptada
      );

      usuariosRegistrados.push(uMock);
      localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));

      alert(`Registro válido. Usuario ${uMock.nombre} registrado. Se ha enviado un correo de confirmación a ${uMock.correo}.`);
      navigate('/login');
    } catch (err) {
      console.error("Error al procesar el registro:", err);
      alert("Ocurrió un error inesperado al registrar el usuario.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 my-5 px-3 registro-container">
      <form 
        id="formulario" 
        onSubmit={handleSubmit} 
        noValidate
        className="registro-form"
      >
        <fieldset className="border border-secondary-subtle p-4 rounded-3 shadow-sm w-100 registro-fieldset">
          <legend className="float-none w-auto px-2 fs-6 fw-bold text-dark text-center">
            Ingrese datos de registro de usuario:
          </legend>

          <FormField 
            label="Nombre completo:" 
            id="nombre" 
            placeholder="Ingrese su nombre" 
            required 
            value={formData.nombre}
            onChange={handleChange}
            error={errors.nombre}
          />

          <FormField 
            label="RUN:" 
            id="run" 
            placeholder="ej: 99999999-9" 
            required 
            value={formData.run}
            onChange={handleChange}
            error={errors.run}
          />

          <FormField 
            label="Correo E:" 
            id="correo" 
            type="email" 
            placeholder="ej: xxxxx@xxxxx.com" 
            autoComplete="username"
            required 
            value={formData.correo}
            onChange={handleChange}
            error={errors.correo}
          />

          <FormField 
            label="Teléfono:" 
            id="telefono" 
            type="tel" 
            placeholder="ej: +56999999999" 
            required 
            value={formData.telefono}
            onChange={handleChange}
            error={errors.telefono}
          />

          <FormField 
            label="Fecha de nacimiento:" 
            id="fecNac" 
            type="date" 
            required 
            value={formData.fecNac}
            onChange={handleChange}
            error={errors.fecNac}
          />

          <FormField 
            label="Dirección:" 
            id="direccion" 
            placeholder="ej: Calle Norte 123" 
            required 
            value={formData.direccion}
            onChange={handleChange}
            error={errors.direccion}
          />

          <SelectField 
            label="Comuna (RM):"
            id="comuna"
            required
            value={formData.comuna}
            onChange={handleChange}
            options={comunasRM}
            defaultOptionText="Seleccione una comuna"
            error={errors.comuna}
          />

          <SelectField 
            label="Estilo musical:"
            id="estiloMusical"
            required
            value={formData.estiloMusical}
            onChange={handleChange}
            options={estilosMusicales}
            defaultOptionText="Seleccione un estilo musical"
            error={errors.estiloMusical}
          />

          <SelectField 
            label="Categoría preferida:"
            id="categoriaInstrumento"
            required
            value={formData.categoriaInstrumento}
            onChange={handleChange}
            options={categoriasInstrumentos}
            defaultOptionText="Seleccione una categoría"
            error={errors.categoriaInstrumento}
          />

          <PasswordInput 
            inputId="password" 
            labelText="Contraseña:" 
            autoComplete="new-password"
            required 
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="mb-3 px-1">
            <small className="text-muted d-block lh-sm texto-ayuda-form" id="label-password-requirements">
              (Debe contener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número, y un carácter especial. No debe contener datos personales ni palabras comunes.)
            </small>
          </div>

          <PasswordInput 
            inputId="repeatPassword" 
            labelText="Repetir contraseña:" 
            autoComplete="new-password"
            required
            value={formData.repeatPassword}
            onChange={handleChange}
            error={errors.repeatPassword}
          />

          <div className="d-flex justify-content-center mt-4">
            <button 
              type="submit" 
              id="btn-registrarse" 
              disabled={isSubmitting}
              className="btn fw-bold px-4 py-2 btn-primario"
            >
              {isSubmitting ? "Procesando..." : "Registrarse"}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default RegistroView;