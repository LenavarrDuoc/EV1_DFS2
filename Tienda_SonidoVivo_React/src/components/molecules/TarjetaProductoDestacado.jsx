import { Link } from "react-router-dom";

function TarjetaProductoDestacado({ producto }) {
    return (
        <>
            <article className="producto-destacado">

                <img 
                    src={producto.imagen}
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