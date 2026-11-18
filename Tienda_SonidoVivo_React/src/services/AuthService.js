// src/services/AuthService.js
import axios from 'axios';

const AUTH_API_URL = 'http://localhost/api/v1/auth';

// Decodifica el payload Base64 del JWT para leer sub (correo), rol e id sin librerías extra
const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            window.atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('Error decodificando JWT:', e);
        return null;
    }
};

const AuthService = {
    login: async (correo, password) => {
        const response = await axios.post(`${AUTH_API_URL}/login`, {
            correo,
            password
        });

        const { token, type } = response.data;
        const claims = parseJwt(token);

        return {
            token,
            type: type || 'Bearer',
            idUsuario: claims?.id || null,
            correo: claims?.sub || correo,
            // Guardamos el rol exacto del backend (ej. ROLE_ADMIN / ROLE_CLIENTE)
            rol: claims?.rol || 'ROLE_CLIENTE',
            // Usamos la parte antes del @ como nombre visible en la barra de navegación
            nombre: (claims?.sub || correo).split('@')[0]
        };
    }
};

export default AuthService;