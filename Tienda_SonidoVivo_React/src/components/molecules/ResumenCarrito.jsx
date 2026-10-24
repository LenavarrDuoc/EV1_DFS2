import { useCart } from '../../context/CartContext';

function ResumenCarrito({ onFinalizarCompra }) {
    const { carrito, vaciarCarrito } = useCart();

    // Convierte el string de precio "$249.990" a un número usable
    const calcularSubtotal = () => {
        return carrito.reduce((total, item) => {
            const precioNumerico = parseInt(item.precio.replace(/[^0-9]/g, '')) || 0;
            return total + (precioNumerico * item.cantidad);
        }, 0);
    };

    const subtotal = calcularSubtotal();
    const formatoChileno = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

    return (
        <aside className="carrito-resumen card p-3 border rounded-3 shadow-sm">
            <h3 className="fs-5 fw-bold mb-3">Resumen del Pedido</h3>

            <div className="resumen-linea d-flex justify-content-between align-items-center mb-2">
                <span>Productos ({carrito.reduce((acc, i) => acc + i.cantidad, 0)}):</span>
                <span>{formatoChileno.format(subtotal)}</span>
            </div>

            <div className="resumen-linea d-flex justify-content-between align-items-center mb-2">
                <span>Envío:</span>
                <span style={{ color: 'var(--color_7)', fontWeight: 'bold' }}>Gratis</span>
            </div>

            <div className="resumen-linea resumen-total d-flex justify-content-between align-items-center fw-bold border-top pt-2 mt-3 mb-3 fs-5">
                <span>Total:</span>
                <span>{formatoChileno.format(subtotal)}</span>
            </div>

            <button 
                type="button" 
                className="btn btn-checkout w-100 mb-2" 
                onClick={onFinalizarCompra} 
            > 
                FINALIZAR COMPRA 
            </button> 

            <button 
                type="button" 
                className="btn btn-vaciar w-100" 
                onClick={vaciarCarrito} 
            > 
                Vaciar Carrito 
            </button> 
        </aside> 
    ); 
}

export default ResumenCarrito;