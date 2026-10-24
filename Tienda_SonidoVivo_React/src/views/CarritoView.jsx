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
    <main className="container my-5">
      <section id="carrito-compras">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">Carrito de Compras</h2>
        </div>

        {(!carrito || carrito.length === 0) ? (
          <div 
            className="text-center p-5 rounded-3 shadow-sm my-4"
            style={{ backgroundColor: 'rgba(226, 234, 198, 0.5)' }}
          >
            <p className="fs-5 mb-4 text-dark fw-semibold">
              Tu carrito de compras está vacío actualmente.
            </p>
            <Link 
              to="/productos" 
              className="btn text-white fw-bold px-4 py-2 text-decoration-none"
              style={{ backgroundColor: 'var(--color_3)', borderColor: 'var(--color_3)' }}
            >
              EXPLORAR CATÁLOGO
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <ListaCarrito items={carrito} />
            </div>
            <div className="col-lg-4">
              <ResumenCarrito onFinalizarCompra={handleFinalizarCompra} />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default CarritoView;