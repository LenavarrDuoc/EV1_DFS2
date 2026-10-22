function TarjetaProductoDestacado({producto}) {
    return (
        <>
            <article className="producto-destacado">

                <img 
                    src={producto.img}
                    alt={producto.nombre}
                />

                <h3>{producto.nombre}</h3>

                <p>
                    {producto.descripcion}
                </p>

                <a href={producto.href} className="boton">
                    VER PRODUCTO
                </a>

            </article>
        </>
    )
}

export default TarjetaProductoDestacado