import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PasswordInput from '../components/PasswordInput';
import FormField from '../components/FormField';
import { itemsFooter } from '../data/footer';

function Registro() {
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
    "Rock",
    "Pop",
    "Jazz",
    "Blues",
    "Metal",
    "Hip Hop / Rap",
    "Reggae",
    "Música Clásica",
    "Música Electrónica",
    "Folclore / Tradicional",
    "Funk / Soul",
    "Latina / Salsa / Cumbia"
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

  // Estado centralizado para el formulario
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

  // Manejador único para actualizar el estado
  const handleChange = (e) => {
    const { id, name, value } = e.target;
    const key = id || name;
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de registro enviados:", formData);
  };

  return (
    <>
      <Header />
      <form id="formulario" onSubmit={handleSubmit}>
        <fieldset className="grid-formulario">
          <legend className="legend-titulo-fieldset">Ingrese datos de registro de usuario: </legend>
          
          <FormField 
            label="Nombre completo:" 
            id="nombre" 
            placeholder="Ingrese su nombre" 
            required 
            value={formData.nombre}
            onChange={handleChange}
          />
          <FormField 
            label="RUN:" 
            id="run" 
            placeholder="ej: 99999999-9" 
            required 
            value={formData.run}
            onChange={handleChange}
          />
          <FormField 
            label="Correo E:" 
            id="correo" 
            type="email" 
            placeholder="ej: xxxxx@xxxxx.com" 
            required 
            value={formData.correo}
            onChange={handleChange}
          />
          <FormField 
            label="Teléfono:" 
            id="telefono" 
            type="tel" 
            placeholder="ej: +56999999999" 
            required 
            value={formData.telefono}
            onChange={handleChange}
          />
          <FormField 
            label="Fecha de nacimiento:" 
            id="fecNac" 
            type="date" 
            required 
            value={formData.fecNac}
            onChange={handleChange}
          />
          <FormField 
            label="Dirección:" 
            id="direccion" 
            placeholder="ej: Calle Norte 123" 
            required 
            value={formData.direccion}
            onChange={handleChange}
          />

          <div className="campo">
            <label htmlFor="comuna">Comuna (RM): </label>
            <select 
              required 
              id="comuna" 
              name="comuna" 
              value={formData.comuna} 
              onChange={handleChange}
            >
              <option value="" disabled>Seleccione una comuna</option>
              {comunasRM.map((comuna) => (
                <option key={comuna} value={comuna}>
                  {comuna}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label htmlFor="estiloMusical">Estilo musical de preferencia: </label>
            <select 
              required 
              id="estiloMusical" 
              name="estiloMusical" 
              value={formData.estiloMusical} 
              onChange={handleChange}
            >
              <option value="" disabled>Seleccione un estilo musical</option>
              {estilosMusicales.map((estilo) => (
                <option key={estilo} value={estilo}>
                  {estilo}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label htmlFor="categoriaInstrumento">Categoría de instrumento de preferencia: </label>
            <select 
              required 
              id="categoriaInstrumento" 
              name="categoriaInstrumento" 
              value={formData.categoriaInstrumento} 
              onChange={handleChange}
            >
              <option value="" disabled>Seleccione una categoría</option>
              {categoriasInstrumentos.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <PasswordInput 
            inputId="password" 
            labelText="Contraseña:" 
            required 
            value={formData.password}
            onChange={handleChange}
          />
          
          <label id="label-password-requirements">
            (Debe contener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número, y un caracter especial. No debe contener datos personales ni palabras comunes a contraseña/password.)
          </label>

          <PasswordInput 
            inputId="repeatPassword" 
            labelText="Repetir contraseña:" 
            required
            value={formData.repeatPassword}
            onChange={handleChange}
          />

          <button type="submit" id="btn-registrarse">Registrarse</button>
        </fieldset>
      </form>

      <Footer itemsFooter={itemsFooter} />
    </>
  );
}

export default Registro;