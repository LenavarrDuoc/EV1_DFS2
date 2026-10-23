import { createContext, useContext, useState, useEffect } from "react";
import { encriptarPassword } from "../utils/validaciones";

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

        // Inyeccion de una cuenta admin si no existe una
        const inicializarAdmin = async () => {

                const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
                const adminExiste = usuariosRegistrados.some(
                    (u) => u.correo.toLowerCase() === "admin@sonidovivo.cl"
                );

                if (!adminExiste) {
                    const passEncriptada = await encriptarPassword("Admin123!");
                    
                    const adminUser = {
                        nombre: "Administrador SonidoVivo",
                        run: "11111111-1",
                        correo: "admin@sonidovivo.cl",
                        telefono: "+56911111111",
                        fecNac: "1990-01-01",
                        direccion: "Av. Principal 123",
                        comuna: "Santiago",
                        estiloMusical: "Rock",
                        categoriaInstrumento: "Guitarras",
                        password: passEncriptada,
                        rol: "admin"
                    };

                    usuariosRegistrados.push(adminUser);
                    localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
                }

                };

                inicializarAdmin();

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