// src/services/AuthService.js
import axios from 'axios';

const AUTH_API_URL = 'http://localhost/api/v1/auth';
const USUARIOS_API_URL = 'http://localhost/api/v1/usuarios';

// Decodifica el payload Base64 del JWT para leer sub (correo), rol e id
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
        // 1. Autenticar y obtener JWT desde ms-auth
        const response = await axios.post(`${AUTH_API_URL}/login`, {
            correo,
            password
        });

        const { token, type } = response.data;
        const claims = parseJwt(token);
        const idUsuario = claims?.id;
        const rolJwt = claims?.rol || 'Cliente';

        // 2. Obtener los datos completos del usuario desde ms-usuarios usando su ID y el JWT
        let datosUsuario = {};
        if (idUsuario) {
            try {
                const userRes = await axios.get(`${USUARIOS_API_URL}/${idUsuario}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                datosUsuario = userRes.data;
            } catch (err) {
                console.warn('No se pudieron cargar los detalles extendidos desde ms-usuarios:', err);
            }
        }

        // Construir nombre completo desde UsuarioResponseDTO (pnombre, snombre, apaterno, amaterno)
        const partesNombre = [
            datosUsuario.pnombre,
            datosUsuario.snombre,
            datosUsuario.apaterno,
            datosUsuario.amaterno
        ].filter(Boolean);

        const nombreCompleto = partesNombre.length > 0
            ? partesNombre.join(' ')
            : (claims?.sub || correo).split('@')[0];

        return {
            ...datosUsuario,
            token,
            type: type || 'Bearer',
            idUsuario: datosUsuario.idUsuario || idUsuario || null,
            correo: datosUsuario.correo || claims?.sub || correo,
            rol: datosUsuario.nombreRol || rolJwt, // 'Administrador', 'Vendedor' o 'Cliente'
            nombre: nombreCompleto,
            fecNac: datosUsuario.fechaNacimiento || null,
            estiloMusical: datosUsuario.nombreEstilo || null,
            categoriaInstrumento: datosUsuario.nombreCategoriaInst || null
        };
    }
};

export default AuthService;