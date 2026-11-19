import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FormField from '../components/molecules/FormField';
import PasswordInput from '../components/molecules/PasswordInput';
import SelectField from '../components/molecules/SelectField';
import { validarRegistro, validarCampo } from '../utils/validaciones';
import RegistroService from '../services/RegistroService';

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

  const [estilosCatalog, setEstilosCatalog] = useState([]);
  const [categoriasCatalog, setCategoriasCatalog] = useState([]);
  const [estilosMusicales, setEstilosMusicales] = useState([]);
  const [categoriasInstrumentos, setCategoriasInstrumentos] = useState([]);

  const [formData, setFormData] = useState({
    run: '',
    pnombre: '',
    snombre: '',
    apaterno: '',
    amaterno: '',
    correo: '',
    fechaNacimiento: '',
    direccion: '',
    comuna: '',
    estiloMusical: '',
    categoriaInstrumento: '',
    password: '',
    repeatPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const [resEstilos, resCategorias] = await Promise.all([
          RegistroService.obtenerEstilosMusicales(),
          RegistroService.obtenerCategoriasInstrumentos()
        ]);
        
        setEstilosCatalog(resEstilos.data);
        setCategoriasCatalog(resCategorias.data);
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

    const idEstiloSeleccionado = estilosCatalog.find(est => est.nombreEstilo === formData.estiloMusical)?.idEstilo || '';
    const idCatSeleccionada = categoriasCatalog.find(cat => cat.nombreCategoriaInst === formData.categoriaInstrumento)?.idCategoriaInst || '';

    const usuarioParaValidar = {
      ...formData,
      idEstilo: idEstiloSeleccionado,
      idCategoriaInst: idCatSeleccionada
    };

    const errorList = validarRegistro(usuarioParaValidar, []);

    if (Object.keys(errorList).length > 0) {
      setErrors(errorList);
      const primerError = Object.keys(errorList)[0];
      const elementoConError = document.getElementById(primerError);
      if (elementoConError) {
        elementoConError.focus();
      }
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});

      // DTO mapeado exactamente a lo que pide Spring Security / UsuarioInputDTO
      const usuarioInputDTO = {
        run: formData.run,
        pnombre: formData.pnombre,
        snombre: formData.snombre,
        apaterno: formData.apaterno,
        amaterno: formData.amaterno,
        correo: formData.correo,
        password: formData.password,
        fechaNacimiento: formData.fechaNacimiento,
        direccion: formData.direccion,
        comuna: formData.comuna,
        idRol: 2, 
        idEstilo: idEstiloSeleccionado,
        idCategoriaInst: idCatSeleccionada
      };

      await RegistroService.registrarUsuario(usuarioInputDTO);

      alert(`Registro válido. Usuario ${formData.pnombre} registrado. Se ha enviado un correo de confirmación a ${formData.correo}.`);
      navigate('/login');

    } catch (err) {
      console.error("Error al procesar el registro:", err);
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
            label="RUN:" 
            id="run" 
            placeholder="ej: 99999999-9" 
            required 
            value={formData.run}
            onChange={handleChange}
            error={errors.run}
          />

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

          <FormField
            label="Fecha de nacimiento:"
            id="fechaNacimiento"
            type="date"
            required
            value={formData.fechaNacimiento}
            onChange={handleChange}
            error={errors.fechaNacimiento}
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