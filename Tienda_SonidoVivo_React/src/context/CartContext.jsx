import { createContext, useState, useEffect } from 'react';
import CarritoService from '../services/CarritoService';
import { useAuth } from './useAuth'; // Ajusta la ruta si tu useAuth está en otra carpeta

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Usamos 'user', que es la variable real que exporta tu AuthContext
    const { user } = useAuth(); 

    const [carrito, setCarrito] = useState([]);
    const [carritoIdBackend, setCarritoIdBackend] = useState(null);

    const formatearCarritoBackend = (backendItems) => {
        if (!backendItems) return [];
        return backendItems.map(item => ({
            id: item.idProducto,
            nombre: item.productoInfo.nombre,
            precio: item.precioUnitario,
            cantidad: item.cantidad,
            imagenUri: item.productoInfo.imagenUri
        }));
    };

    useEffect(() => {
        const inicializarCarrito = async () => {
            // Validamos usando 'user' en todo este bloque
            if (user && user.idUsuario) {
                try {
                    const carritoDb = await CarritoService.crearObtenerCarrito(user.idUsuario);
                    setCarritoIdBackend(carritoDb.idCarrito);

                    const carritoTemporal = JSON.parse(sessionStorage.getItem('carrito_temporal')) || [];
                    
                    if (carritoTemporal.length > 0) {
                        const confirmar = window.confirm("Tienes productos seleccionados previamente. ¿Deseas agregarlos a tu carrito de compras personal?");
                        
                        if (confirmar) {
                            for (let item of carritoTemporal) {
                                await CarritoService.agregarItem(carritoDb.idCarrito, item.id, item.cantidad);
                            }
                        }
                        sessionStorage.removeItem('carrito_temporal');
                        
                        const carritoActualizado = await CarritoService.crearObtenerCarrito(user.idUsuario);
                        setCarrito(formatearCarritoBackend(carritoActualizado.items));
                    } else {
                        setCarrito(formatearCarritoBackend(carritoDb.items));
                    }
                } catch (error) {
                    console.error("Error al cargar carrito del usuario:", error);
                }
            } else {
                setCarritoIdBackend(null);
                const guardado = sessionStorage.getItem('carrito_temporal');
                setCarrito(guardado ? JSON.parse(guardado) : []);
            }
        };

        inicializarCarrito();
    }, [user]);

    useEffect(() => {
        if (!user) {
            sessionStorage.setItem('carrito_temporal', JSON.stringify(carrito));
        }
    }, [carrito, user]);

    const agregarAlCarrito = async (producto, cantidad = 1) => {
        const numCantidad = Number(cantidad) || 1;

        if (user && carritoIdBackend) {
            const carritoActualizado = await CarritoService.agregarItem(carritoIdBackend, producto.id, numCantidad);
            setCarrito(formatearCarritoBackend(carritoActualizado.items));
        } else {
            setCarrito(prevCart => {
                const existeIndex = prevCart.findIndex(item => String(item.id) === String(producto.id));
                if (existeIndex >= 0) {
                    const nuevoCarrito = [...prevCart];
                    nuevoCarrito[existeIndex] = {
                        ...nuevoCarrito[existeIndex],
                        cantidad: Number(nuevoCarrito[existeIndex].cantidad) + numCantidad
                    };
                    return nuevoCarrito;
                } else {
                    return [...prevCart, { ...producto, cantidad: numCantidad }];
                }
            });
        }
    };

    const actualizarCantidad = async (id, cantidad) => {
        const numCantidad = Number(cantidad);
        
        if (user && carritoIdBackend) {
            if (numCantidad <= 0) {
                await CarritoService.eliminarItem(carritoIdBackend, id);
            } else {
                await CarritoService.actualizarCantidad(carritoIdBackend, id, numCantidad);
            }
            const res = await CarritoService.crearObtenerCarrito(user.idUsuario);
            setCarrito(formatearCarritoBackend(res.items));
        } else {
            if (numCantidad <= 0) {
                eliminarDelCarrito(id);
                return;
            }
            setCarrito(prevCart =>
                prevCart.map(item => String(item.id) === String(id) ? { ...item, cantidad: numCantidad } : item)
            );
        }
    };

    const eliminarDelCarrito = async (id) => {
        if (user && carritoIdBackend) {
            const carritoActualizado = await CarritoService.eliminarItem(carritoIdBackend, id);
            setCarrito(formatearCarritoBackend(carritoActualizado.items));
        } else {
            setCarrito(prevCart => prevCart.filter(item => String(item.id) !== String(id)));
        }
    };

    const vaciarCarrito = async () => {
        if (user) {
            await CarritoService.vaciarCarrito(user.idUsuario);
            setCarrito([]);
        } else {
            setCarrito([]);
        }
    };

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