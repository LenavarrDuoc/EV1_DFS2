import axios from 'axios';

const API_URL = 'http://localhost/api/v1/productos';
const CATEGORIAS_URL = 'http://localhost/api/v1/categorias-productos';

// Helper para obtener el token guardado en AuthContext (ajusta si tu objeto user guarda el token en otra propiedad)
const getAuthHeaders = () => {
    const storedUser = localStorage.getItem('usuario_sonidovivo');
    if (storedUser) {
        const userObj = JSON.parse(storedUser);
        const token = userObj.token || userObj.accessToken || userObj.jwt;
        if (token) {
            return { Authorization: `Bearer ${token}` };
        }
    }
    return {};
};

const ProductoService = {
    // --- ENDPOINTS PÚBLICOS (No requieren token) ---
    getAllProductos: () => {
        return axios.get(API_URL);
    },
    getProductosActivos: () => {
        return axios.get(`${API_URL}/activos`);
    },
    getProductoById: (id) => {
        return axios.get(`${API_URL}/${id}`);
    },
    getAllCategorias: () => {
        return axios.get(CATEGORIAS_URL);
    },

    // --- ENDPOINTS PROTEGIDOS (Requieren token JWT) ---
    createProducto: (productoData) => {
        return axios.post(API_URL, productoData, { headers: getAuthHeaders() });
    },
    updateProducto: (id, productoData) => {
        return axios.put(`${API_URL}/${id}`, productoData, { headers: getAuthHeaders() });
    },
    deleteProducto: (id) => {
        return axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    },
    updateStock: (id, stockData) => {
        return axios.patch(`${API_URL}/${id}/stock`, stockData, { headers: getAuthHeaders() });
    },
    uploadImagen: (id, file) => {
        const formData = new FormData();
        formData.append('file', file);
        // No definimos Content-Type manual para que axios/navegador ponga el boundary correcto
        return axios.post(`${API_URL}/${id}/imagen`, formData, {
            headers: getAuthHeaders()
        });
    }
};

export default ProductoService;