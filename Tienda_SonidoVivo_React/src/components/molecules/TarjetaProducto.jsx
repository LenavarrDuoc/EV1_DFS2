import { Link } from 'react-router-dom';
import BotonAgregarCarrito from '../atoms/BotonAgregarCarrito';

function TarjetaProducto({ producto }) {

    return (
        <article className="producto">
            <img 
                src={producto.imagen} 
                alt={producto.nombre} 
            />

            <div className="producto-info">
                <h3>{producto.nombre}</h3>

                <p>{producto.descripcion}</p>

                <p className="producto-precio">
                    {producto.precio}
                </p>

                <Link 
                    to={`/producto/${producto.id}`} 
                    className="boton"
                >
                    VER PRODUCTO
                </Link>

                <BotonAgregarCarrito producto={producto} />
            </div>
        </article>
    );

};

export default TarjetaProducto;