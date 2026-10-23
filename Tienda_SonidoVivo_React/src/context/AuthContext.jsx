import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const storedUser = localStorage.getItem("usuario_sonidovivo");

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Error al parsear el usuario guardado:", e);
            }
        }
    }, []);

    const login = (userData) => {
        // Asignamos rol por defecto 'cliente' si no viene definido
        const usuarioSesion = {
            ...userData,
            rol: userData.rol || (userData.correo === "admin@sonidovivo.cl" ? "admin" : "cliente")
        };

        setUser(usuarioSesion);
        localStorage.setItem("usuario_sonidovivo", JSON.stringify(usuarioSesion));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("usuario_sonidovivo");
    };

    const isAdmin = user?.rol === 'admin';

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

export const useAuth = () => useContext(AuthContext);