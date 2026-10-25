import { useParams, Link } from 'react-router-dom';
import { itemsProductos } from '../data/productosData';
import DetalleProductoCard from '../components/organisms/TarjetaProductoDetalle';

function ProductoDetalleView() {
    const { id } = useParams();

    // Buscar el producto por ID en la lista de items
    const productoEncontrado = itemsProductos.find(p => p.id === parseInt(id));

    if (!productoEncontrado) {
        return (
            <main>
                <section id="detalle-producto">
                    <div className="sin-productos">
                        <h2>Producto no encontrado</h2>
                        <p>El producto solicitado no existe en nuestro catálogo.</p>
                        <br />
                        <Link to="/productos" className="boton-secundario">
                            VOLVER AL CATÁLOGO
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main>
            <section id="detalle-producto">
                <div className="producto-navegacion">
                    <Link to="/productos" className="boton-secundario">
                        ← VOLVER AL CATÁLOGO
                    </Link>
                </div>

                <DetalleProductoCard producto={productoEncontrado} />
            </section>
        </main>
    );
}

export default ProductoDetalleView;