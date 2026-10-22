import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const storedUser = localStorage.getItem("usuario_sonidovivo");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        };

    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("usuario_sonidovivo")

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