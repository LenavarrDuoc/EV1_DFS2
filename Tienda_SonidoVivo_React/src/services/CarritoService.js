// src/services/CarritoService.js
import axios from 'axios';

// Apuntamos al Gateway (Traefik) en el puerto 80, no directo al microservicio
const API_URL = 'http://localhost/api/v1/carritos';

// Helper para extraer el JWT de la sesión y devolverlo en los headers de autorización.
const getAuthHeaders = () => {
    const storedUser = localStorage.getItem('usuario_sonidovivo');
    if (storedUser) {
        const userObj = JSON.parse(storedUser);
        const token = userObj.token;
        if (token) {
            return { Authorization: `Bearer ${token}` };
        }
    }
    return {};
};

const CarritoService = {
    crearObtenerCarrito: async (idUsuario) => {
        const response = await axios.post(API_URL, { idUsuario }, { headers: getAuthHeaders() });
        return response.data;
    },

    agregarItem: async (idCarrito, idProducto, cantidad) => {
        const response = await axios.post(`${API_URL}/${idCarrito}/items`, {
            idProducto,
            cantidad
        }, { headers: getAuthHeaders() });
        return response.data;
    },

    actualizarCantidad: async (idCarrito, idProducto, cantidad) => {
        // Al ser PUT con @RequestParam 'cantidad', se pasa en la URL, sin body (null)
        const response = await axios.put(`${API_URL}/${idCarrito}/items/${idProducto}?cantidad=${cantidad}`, null, { headers: getAuthHeaders() });
        return response.data;
    },

    eliminarItem: async (idCarrito, idProducto) => {
        const response = await axios.delete(`${API_URL}/${idCarrito}/items/${idProducto}`, { headers: getAuthHeaders() });
        return response.data;
    },

    vaciarCarrito: async (idUsuario) => {
        await axios.delete(`${API_URL}/usuario/${idUsuario}/vaciar`, { headers: getAuthHeaders() });
    }
};

export default CarritoService;