import { useContext } from 'react';
import { CartContext } from './CartContext'; // <- Como están en la misma carpeta, la ruta es ./

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser usado dentro de un CartProvider");
    }
    return context;
};