import TarjetaProductoDestacado from './TarjetaProductoDestacado'

function GaleriaProductosDestacados({children}) {
    return (
        <>
            <section id="productos-destacados">

                <h2>Productos destacados</h2>

                <div class="productos-grid">
                    {
                        children.map((producto) => (
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