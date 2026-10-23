import { useCart } from '../../context/CartContext';

function BotonAgregarCarrito({ producto, cantidad = 1 }) {
    
    const { agregarAlCarrito } = useCart();

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (producto) {
            agregarAlCarrito(producto, Number(cantidad));
        }
    };

    return (
        <button 
            type="button" 
            onClick={handleClick}
            className="btn-agregar-carrito"
        >
            AÑADIR AL CARRITO
        </button>
    );
}

export default BotonAgregarCarrito;