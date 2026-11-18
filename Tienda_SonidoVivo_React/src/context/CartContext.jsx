import { createContext, useState, useEffect } from 'react';
import CarritoService from '../services/CarritoService';
import { useAuth } from './useAuth';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth(); 

    const [carrito, setCarrito] = useState([]);
    const [carritoIdBackend, setCarritoIdBackend] = useState(null);

    const formatearCarritoBackend = (backendItems) => {
        if (!backendItems) return [];
        return backendItems.map(item => ({
            id: item.idProducto,
            nombre: item.productoInfo?.nombre || 'Producto',
            precio: item.precioUnitario,
            cantidad: item.cantidad,
            imagenUri: item.productoInfo?.imagenUri
        }));
    };

    // EFECTO DE ARRANQUE Y LOGIN
    useEffect(() => {
        const inicializarCarrito = async () => {
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
                        // Limpiamos el temporal tras fusionar (o rechazar)
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
                // Usuario Invitado o acaba de hacer Logout
                setCarritoIdBackend(null);
                const guardado = sessionStorage.getItem('carrito_temporal');
                setCarrito(guardado ? JSON.parse(guardado) : []);
            }
        };

        inicializarCarrito();
    }, [user]);

    // FUNCION AUXILIAR PARA INVITADOS: Guarda el estado y el sessionStorage a la vez, evitando desfaces. Lo que quede en carrito auxiliar, se puede o no agregar al carrito personal de usuario al iniciar sesión.
    const actualizarCarritoLocal = (nuevoCarrito) => {
        setCarrito(nuevoCarrito);
        sessionStorage.setItem('carrito_temporal', JSON.stringify(nuevoCarrito));
    };

    const agregarAlCarrito = async (producto, cantidad = 1) => {
        const numCantidad = Number(cantidad) || 1;

        if (user && carritoIdBackend) {
            const carritoActualizado = await CarritoService.agregarItem(carritoIdBackend, producto.id, numCantidad);
            setCarrito(formatearCarritoBackend(carritoActualizado.items));
        } else {
            const existeIndex = carrito.findIndex(item => String(item.id) === String(producto.id));
            let nuevoCarrito = [...carrito];
            
            if (existeIndex >= 0) {
                nuevoCarrito[existeIndex] = {
                    ...nuevoCarrito[existeIndex],
                    cantidad: Number(nuevoCarrito[existeIndex].cantidad) + numCantidad
                };
            } else {
                nuevoCarrito = [...carrito, { ...producto, cantidad: numCantidad }];
            }
            actualizarCarritoLocal(nuevoCarrito);
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
            const nuevoCarrito = carrito.map(item => String(item.id) === String(id) ? { ...item, cantidad: numCantidad } : item);
            actualizarCarritoLocal(nuevoCarrito);
        }
    };

    const eliminarDelCarrito = async (id) => {
        if (user && carritoIdBackend) {
            const carritoActualizado = await CarritoService.eliminarItem(carritoIdBackend, id);
            setCarrito(formatearCarritoBackend(carritoActualizado.items));
        } else {
            const nuevoCarrito = carrito.filter(item => String(item.id) !== String(id));
            actualizarCarritoLocal(nuevoCarrito);
        }
    };

    const vaciarCarrito = async () => {
        if (user) {
            await CarritoService.vaciarCarrito(user.idUsuario);
            setCarrito([]);
        } else {
            actualizarCarritoLocal([]);
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