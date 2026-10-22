import { useCart } from '../../context/CartContext';

function BotonAgregarCarrito({ producto, cantidad = 1 }) {
    
    const { agregarAlCarrito } = useCart();

    return (
        <button 
            type="button"
            onClick={() => agregarAlCarrito(producto, cantidad)}
            className="btn-agregar-carrito"
        >
            AÑADIR AL CARRITO
        </button>
    );
}

export default BotonAgregarCarrito;