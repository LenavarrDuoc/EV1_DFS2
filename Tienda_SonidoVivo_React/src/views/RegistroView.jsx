import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FormField from '../components/molecules/FormField';
import PasswordInput from '../components/molecules/PasswordInput';
import SelectField from '../components/molecules/SelectField';
import { validarRegistro, validarCampo } from '../utils/validaciones';
import RegistroService from '../services/RegistroService'; // Importamos el servicio real

function RegistroView() {
  const navigate = useNavigate();

  // Estados para guardar los objetos completos del backend
  const [estilosCatalog, setEstilosCatalog] = useState([]);
  const [categoriasCatalog, setCategoriasCatalog] = useState([]);

  // Arreglos de strings para no romper tu componente <SelectField> original
  const [estilosMusicales, setEstilosMusicales] = useState([]);
  const [categoriasInstrumentos, setCategoriasInstrumentos] = useState([]);

  const [formData, setFormData] = useState({
    pnombre: '',
    snombre: '',
    apaterno: '',
    amaterno: '',
    correo: '',
    estiloMusical: '',
    categoriaInstrumento: '',
    password: '',
    repeatPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar catálogos al montar el componente
  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const [resEstilos, resCategorias] = await Promise.all([
          RegistroService.obtenerEstilosMusicales(),
          RegistroService.obtenerCategoriasInstrumentos()
        ]);
        
        // Guardamos los catálogos completos (para sacar los IDs después)
        setEstilosCatalog(resEstilos.data);
        setCategoriasCatalog(resCategorias.data);

        // Extraemos solo los nombres para pasarlos a tu SelectField
        setEstilosMusicales(resEstilos.data.map(e => e.nombreEstilo));
        setCategoriasInstrumentos(resCategorias.data.map(c => c.nombreCategoriaInst));
      } catch (error) {
        console.error("Error al cargar catálogos desde el backend:", error);
      }
    };
    fetchCatalogos();
  }, []);

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    const key = id || name;
    if (!key) return;

    const updatedFormData = {
      ...formData,
      [key]: value
    };

    setFormData(updatedFormData);

    // Validamos en tiempo real si existe la función validarCampo
    if (typeof validarCampo === 'function') {
      const mensajeError = validarCampo(key, value, updatedFormData, []);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: mensajeError
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Adaptamos el formData al formato que espera validarRegistro ahora
    // (Asignando los IDs correspondientes según la selección)
    const idEstiloSeleccionado = estilosCatalog.find(est => est.nombreEstilo === formData.estiloMusical)?.idEstilo || '';
    const idCatSeleccionada = categoriasCatalog.find(cat => cat.nombreCategoriaInst === formData.categoriaInstrumento)?.idCategoriaInst || '';

    const usuarioParaValidar = {
      ...formData,
      idEstilo: idEstiloSeleccionado,
      idCategoriaInst: idCatSeleccionada
    };

    // CORRECCIÓN AQUÍ: Pasamos el objeto a validar y el arreglo vacío [] para que no falle el .some()
    const errorList = validarRegistro(usuarioParaValidar, []);

    // Si validarRegistro ahora retorna un objeto con errores
    if (Object.keys(errorList).length > 0) {
      setErrors(errorList);
      
      // Hacemos focus en el primer error encontrado
      const primerError = Object.keys(errorList)[0];
      const elementoConError = document.getElementById(primerError);
      if (elementoConError) {
        elementoConError.focus();
      }
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({}); // Limpiamos errores

      // Preparamos el DTO final exacto para el Backend
      const usuarioInputDTO = {
        pnombre: formData.pnombre,
        snombre: formData.snombre,
        apaterno: formData.apaterno,
        amaterno: formData.amaterno,
        correo: formData.correo,
        password: formData.password, // Se envía en texto plano asumiendo que Spring Security lo encripta (BCrypt)
        idRol: 2, 
        idEstilo: idEstiloSeleccionado,
        idCategoriaInst: idCatSeleccionada
      };

      // Consumimos el microservicio
      await RegistroService.registrarUsuario(usuarioInputDTO);

      alert(`Registro válido. Usuario ${formData.pnombre} registrado. Se ha enviado un correo de confirmación a ${formData.correo}.`);
      navigate('/login');

    } catch (err) {
      console.error("Error al procesar el registro:", err);
      // Extraemos el mensaje de error del backend si existe
      alert(err.response?.data?.message || "Ocurrió un error inesperado al registrar el usuario.");
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
            label="Primer Nombre:" 
            id="pnombre" 
            placeholder="Ingrese su primer nombre" 
            required 
            value={formData.pnombre}
            onChange={handleChange}
            error={errors.pnombre}
          />

          <FormField 
            label="Segundo Nombre:" 
            id="snombre" 
            placeholder="Ingrese su segundo nombre (opcional)" 
            value={formData.snombre}
            onChange={handleChange}
            error={errors.snombre}
          />

          <FormField 
            label="Apellido Paterno:" 
            id="apaterno" 
            placeholder="Ingrese su apellido paterno" 
            required 
            value={formData.apaterno}
            onChange={handleChange}
            error={errors.apaterno}
          />

          <FormField 
            label="Apellido Materno:" 
            id="amaterno" 
            placeholder="Ingrese su apellido materno (opcional)" 
            value={formData.amaterno}
            onChange={handleChange}
            error={errors.amaterno}
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

          <SelectField 
            label="Estilo musical:"
            id="estiloMusical"
            required
            value={formData.estiloMusical}
            onChange={handleChange}
            options={estilosMusicales}
            defaultOptionText="Seleccione un estilo musical"
            error={errors.estiloMusical || errors.idEstilo}
          />

          <SelectField 
            label="Categoría preferida:"
            id="categoriaInstrumento"
            required
            value={formData.categoriaInstrumento}
            onChange={handleChange}
            options={categoriasInstrumentos}
            defaultOptionText="Seleccione una categoría"
            error={errors.categoriaInstrumento || errors.idCategoriaInst}
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
            error={errors.repeatPassword || errors.confirmarContrasena}
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