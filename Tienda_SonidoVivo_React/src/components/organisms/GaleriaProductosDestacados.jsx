import TarjetaProductoDestacado from '../molecules/TarjetaProductoDestacado'

function GaleriaProductosDestacados({ productos = [] }) {
    return (
        <>
            <section id="productos-destacados">

                <h2>Productos destacados</h2>

                <div className="productos-grid">
                    {
                        productos.map((producto) => (
                            <TarjetaProductoDestacado
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    }
                </div>

            </section>
        </>
    )
}

export default GaleriaProductosDestacados