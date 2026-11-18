import { Link } from 'react-router-dom';
import BotonAgregarCarrito from '../atoms/BotonAgregarCarrito';


function TarjetaProducto({ producto }) {

    return (
        <article className="producto">
            {/* Se cambia producto.imagen por producto.imagenUri (URL desde MinIO) con fallback por si llega nula */}
            <img 
                src={producto.imagenUri || '/placeholder-instrumento.png'} 
                alt={producto.nombre} 
            />

            <div className="producto-info">
                <h3>{producto.nombre}</h3>

                <p>{producto.descripcion}</p>

                {/* Se formatea el precio numérico proveniente del DTO del backend */}
                <p className="producto-precio">
                    ${Number(producto.precio).toLocaleString('es-CL')}
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