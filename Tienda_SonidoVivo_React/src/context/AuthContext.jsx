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
        const usuarioSesion = {
            ...userData,
            rol: userData.rol || "Cliente"
        };

        setUser(usuarioSesion);
        localStorage.setItem("usuario_sonidovivo", JSON.stringify(usuarioSesion));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("usuario_sonidovivo");
    };

    // Coincide con 'Administrador' de la BD (y variantes por compatibilidad)
    const isAdmin = ["Administrador", "ADMINISTRADOR", "admin", "ADMIN", "ROLE_ADMIN"].includes(user?.rol);
    const isVendedor = ["Vendedor", "VENDEDOR", "vendedor", "ROLE_VENDEDOR"].includes(user?.rol);

    return (
        <AuthContext.Provider
            value={{ 
                user,
                login,
                logout,
                isAdmin,
                isVendedor
            }}
        >
            {children}
        </AuthContext.Provider>
    );

};