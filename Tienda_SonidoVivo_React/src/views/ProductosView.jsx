import { useState, useMemo } from 'react';
import { itemsProductos } from '../data/productos';
import FiltroBusquedaCategorias from '../components/molecules/FiltroBusquedaCategorias';
import GaleriaProductos from '../components/organisms/GaleriaProductos';

function ProductosView() {
    const [categoriaActiva, setCategoriaActiva] = useState('Todas');
    const [busqueda, setBusqueda] = useState('');

    // Extraer categorías únicas dinámicamente
    const categorias = useMemo(() => {
        const lista = itemsProductos.map(p => p.categoria);
        return [...new Set(lista)];
    }, []);

    // Filtrar por texto y por categoría
    const productosFiltrados = useMemo(() => {
        return itemsProductos.filter(p => {
            const coincideCat = categoriaActiva === 'Todas' || p.categoria === categoriaActiva;
            const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                                     p.descripcion.toLowerCase().includes(busqueda.toLowerCase());
            return coincideCat && coincideBusqueda;
        });
    }, [categoriaActiva, busqueda]);

    return (
        <main>
            <section id="catalogo">
                <div className="catalogo-encabezado">
                    <h2>Catálogo de productos</h2>
                    <p>
                        Explora nuestra selección de instrumentos y productos
                        musicales. Encuentra opciones para practicar, crear,
                        grabar y disfrutar de la música.
                    </p>
                </div>

                <FiltroBusquedaCategorias 
                    categorias={categorias}
                    categoriaActiva={categoriaActiva}
                    onSeleccionarCategoria={setCategoriaActiva}
                    busqueda={busqueda}
                    onBusquedaChange={setBusqueda}
                />

                <GaleriaProductos productos={productosFiltrados} />
            </section>
        </main>
    );
}

export default ProductosView;