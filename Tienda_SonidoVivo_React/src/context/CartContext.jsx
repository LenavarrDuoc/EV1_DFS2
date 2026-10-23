import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        const guardado = localStorage.getItem('carrito_sonidovivo');
        return guardado ? JSON.parse(guardado) : [];
    });

    useEffect(() => {
        localStorage.setItem('carrito_sonidovivo', JSON.stringify(carrito));
    }, [carrito]);

    // Añadir al carrito asegurando conversión a Número
    const agregarAlCarrito = (producto, cantidad = 1) => {
        const numCantidad = Number(cantidad) || 1;

        setCarrito(prevCart => {
            const existeIndex = prevCart.findIndex(item => String(item.id) === String(producto.id));

            if (existeIndex >= 0) {
                // Si el producto ya existe, creamos una copia limpia y sumamos la cantidad
                const nuevoCarrito = [...prevCart];
                nuevoCarrito[existeIndex] = {
                    ...nuevoCarrito[existeIndex],
                    cantidad: Number(nuevoCarrito[existeIndex].cantidad) + numCantidad
                };
                return nuevoCarrito;
            } else {
                // Si es un producto nuevo, lo agregamos con la cantidad elegida
                return [...prevCart, { ...producto, cantidad: numCantidad }];
            }
        });
    };

    const actualizarCantidad = (id, cantidad) => {
        const numCantidad = Number(cantidad);
        if (numCantidad <= 0) {
            eliminarDelCarrito(id);
            return;
        }
        setCarrito(prevCart =>
            prevCart.map(item => 
                String(item.id) === String(id) ? { ...item, cantidad: numCantidad } : item
            )
        );
    };

    const eliminarDelCarrito = (id) => {
        setCarrito(prevCart => prevCart.filter(item => String(item.id) !== String(id)));
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    // Contador total suma las cantidades numéricas de todos los elementos
    const totalItems = carrito.reduce((acc, item) => acc + (Number(item.cantidad) || 0), 0);

    return (
        <CartContext.Provider value={{
            carrito,
            agregarAlCarrito,
            actualizarCantidad,
            eliminarDelCarrito,
            vaciarCarrito,
            totalItems
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);