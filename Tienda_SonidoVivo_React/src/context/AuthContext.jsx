import { useState } from "react";
import { AuthContext } from "./useAuth";

export const AuthProvider = ({ children }) => {

    // Inicialización directa desde localStorage (evita useEffect y el doble renderizado)
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("usuario_sonidovivo");
        if (!storedUser) return null;

        try {
            return JSON.parse(storedUser);
        } catch (e) {
            console.error("Error al parsear el usuario guardado:", e);
            return null;
        }
    });

    const login = (userData) => {
        // Conservamos el rol que viene del JWT (ej. ROLE_ADMIN, ROLE_CLIENTE) y el token
        const usuarioSesion = {
            ...userData,
            rol: userData.rol || "ROLE_CLIENTE"
        };

        setUser(usuarioSesion);
        localStorage.setItem("usuario_sonidovivo", JSON.stringify(usuarioSesion));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("usuario_sonidovivo");
    };

    // Reconoce tanto 'ROLE_ADMIN' (Spring Security) como 'ADMIN' o 'admin'
    const isAdmin = ["admin", "ADMIN", "ROLE_ADMIN"].includes(user?.rol);

    return (
        <AuthContext.Provider
            value={{ 
                user,
                login,
                logout,
                isAdmin 
            }}
        >
            {children}
        </AuthContext.Provider>
    );

};