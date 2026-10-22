import TarjetaProducto from '../molecules/TarjetaProducto';

function GaleriaProductos({ productos }) {
    if (productos.length === 0) {
        return (
            <div className="sin-productos">
                <p>No se encontraron productos que coincidan con la búsqueda.</p>
            </div>
        );
    }

    return (
        <div className="productos-grid">
            {productos.map((producto) => (
                <TarjetaProducto key={producto.id} producto={producto} />
            ))}
        </div>
    );
}

export default GaleriaProductos;