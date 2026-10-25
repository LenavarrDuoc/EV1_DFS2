import { useCart } from '../../context/CartContext';

function CarritoItem({ item }) {
  const { actualizarCantidad, eliminarDelCarrito } = useCart();

  return (
    <div className="card border-0 shadow-sm p-3 rounded-3 carrito-item-card">
      <div className="row align-items-center g-3">
        {/* Imagen del producto */}
        <div className="col-12 col-sm-auto text-center">
          <img 
            src={item.imagen} 
            alt={item.nombre} 
            className="img-fluid rounded carrito-item-img" 
          />
        </div>

        {/* Información del producto */}
        <div className="col-12 col-sm text-center text-sm-start">
          <h5 className="mb-1 fs-6 fw-bold text-dark">{item.nombre}</h5>
          <p className="mb-0 fw-semibold text-secondary">{item.precio}</p>
        </div>

        {/* Controles de cantidad y botón eliminar */}
        <div className="col-12 col-sm-auto d-flex align-items-center justify-content-center justify-content-sm-end gap-2 flex-wrap">
          <div className="d-flex align-items-center bg-white border rounded px-2 py-1 shadow-sm">
            <button 
              type="button" 
              className="btn btn-sm p-0 px-2 fw-bold text-dark border-0"
              onClick={() => actualizarCantidad(item.id, Number(item.cantidad) - 1)}
            >
              -
            </button>
            
            <span className="px-2 fw-bold text-dark">{item.cantidad}</span>

            <button 
              type="button" 
              className="btn btn-sm p-0 px-2 fw-bold text-dark border-0"
              onClick={() => actualizarCantidad(item.id, Number(item.cantidad) + 1)}
            >
              +
            </button>
          </div>

          <button 
            type="button" 
            className="btn btn-sm btn-outline-danger fw-semibold px-3 py-1 ms-sm-2"
            title="Eliminar producto"
            onClick={() => eliminarDelCarrito(item.id)}
          >
            Eliminar 🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarritoItem;