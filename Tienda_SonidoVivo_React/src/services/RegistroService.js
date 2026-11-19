// src/services/RegistroService.js
import axios from 'axios';

const USUARIOS_URL = 'http://localhost/api/v1/usuarios';
const ESTILOS_URL = 'http://localhost/api/v1/estilos-musicales';
const CATEGORIAS_URL = 'http://localhost/api/v1/categorias-instrumentos';

const RegistroService = {
    
    // Obtener catálogo de Estilos Musicales
    obtenerEstilosMusicales: () => {
        return axios.get(ESTILOS_URL);
    },

    // Obtener catálogo de Categorías de Instrumentos
    obtenerCategoriasInstrumentos: () => {
        return axios.get(CATEGORIAS_URL);
    },

    // Enviar el formulario completo al ms-usuarios
    registrarUsuario: (usuarioInputDTO) => {
        // Axios serializa automáticamente el objeto a JSON
        return axios.post(USUARIOS_URL, usuarioInputDTO);
    }
};

export default RegistroService;