// src/services/CarritoService.js
import axios from 'axios';

// Asegúrate de usar el puerto de tu API Gateway o del microservicio de carrito
const API_URL = 'http://localhost:8080/api/v1/carritos'; 

const CarritoService = {
    
    // Obtiene o crea el carrito activo del usuario
    crearObtenerCarrito: async (idUsuario) => {
        const response = await axios.post(API_URL, { idUsuario });
        return response.data; // Retorna CarritoResponseDTO
    },

    // Agrega un producto (el backend suma automáticamente si ya existe)
    agregarItem: async (idCarrito, idProducto, cantidad) => {
        const response = await axios.post(`${API_URL}/${idCarrito}/items`, {
            idProducto,
            cantidad
        });
        return response.data;
    },

    // Modifica la cantidad exacta de un producto
    actualizarCantidad: async (idCarrito, idProducto, cantidad) => {
        const response = await axios.put(`${API_URL}/${idCarrito}/items/${idProducto}?cantidad=${cantidad}`);
        return response.data;
    },

    // Elimina una línea de producto del carrito
    eliminarItem: async (idCarrito, idProducto) => {
        const response = await axios.delete(`${API_URL}/${idCarrito}/items/${idProducto}`);
        return response.data;
    },

    // Vacía el carrito manteniendo la cabecera
    vaciarCarrito: async (idUsuario) => {
        await axios.delete(`${API_URL}/usuario/${idUsuario}/vaciar`);
    }
};

export default CarritoService;