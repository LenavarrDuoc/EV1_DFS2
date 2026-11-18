import { Link } from "react-router-dom";

function TarjetaProductoDestacado({ producto }) {
    return (
        <>
            <article className="producto-destacado">

                {/* Se cambia producto.imagen por producto.imagenUri (URL desde MinIO) con fallback */}
                <img 
                    src={producto.imagenUri || '/placeholder-instrumento.png'}
                    alt={producto.nombre}
                />

                <h3>{producto.nombre}</h3>

                <p>{producto.descripcion}</p>

                <Link to={`/producto/${producto.id}`} className="boton">
                    VER PRODUCTO
                </Link>

            </article>
        </>
    )
}

export default TarjetaProductoDestacado