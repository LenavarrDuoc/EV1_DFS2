import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ListaCarrito from '../components/organisms/ListaCarrito';
import ResumenCarrito from '../components/molecules/ResumenCarrito';

function CarritoView() {
    const { carrito, vaciarCarrito } = useCart();
    const navigate = useNavigate();

    const handleFinalizarCompra = () => {
        alert("¡Muchas gracias por tu compra en Sonido Vivo! Tu pedido ha sido procesado con éxito.");
        vaciarCarrito();
        navigate('/');
    };

    return (
        <main>
            <section id="carrito-compras">
                <div className="carrito-encabezado">
                    <h2>Carrito de Compras</h2>
                </div>

                {(!carrito || carrito.length === 0) ? (
                    <div className="carrito-vacio">
                        <p>Tu carrito de compras está vacío actualmente.</p>
                        <Link to="/productos" className="btn-explorar-catalogo">
                            EXPLORAR CATÁLOGO
                        </Link>
                    </div>
                ) : (
                    <div className="carrito-layout">
                        <ListaCarrito items={carrito} />
                        <ResumenCarrito onFinalizarCompra={handleFinalizarCompra} />
                    </div>
                )}
            </section>
        </main>
    );
}

export default CarritoView;