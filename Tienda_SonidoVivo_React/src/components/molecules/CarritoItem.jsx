import { useCart } from '../../context/CartContext';

function CarritoItem({ item }) {
    const { actualizarCantidad, eliminarDelCarrito } = useCart();

    return (
        <div className="carrito-item">
            <img src={item.imagen} alt={item.nombre} className="carrito-item-img" />

            <div className="carrito-item-info">
                <h4>{item.nombre}</h4>
                <p className="carrito-item-precio">{item.precio}</p>
            </div>

            <div className="carrito-item-controles">
                <button 
                    type="button" 
                    className="btn-cantidad"
                    onClick={() => actualizarCantidad(item.id, Number(item.cantidad) - 1)}
                >
                    -
                </button>
                
                <span className="cant-text">{item.cantidad}</span>

                <button 
                    type="button" 
                    className="btn-cantidad"
                    onClick={() => actualizarCantidad(item.id, Number(item.cantidad) + 1)}
                >
                    +
                </button>

                <button 
                    type="button" 
                    className="btn-eliminar"
                    title="Eliminar producto"
                    onClick={() => eliminarDelCarrito(item.id)}
                >
                    Eliminar 🗑️
                </button>
            </div>
        </div>
    );
}

export default CarritoItem;