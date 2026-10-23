import { useState, useMemo } from 'react';
import { itemsProductos } from '../data/productos';
import FiltroBusquedaCategorias from '../components/molecules/FiltroBusquedaCategorias';
import GaleriaProductos from '../components/organisms/GaleriaProductos';

function ProductosView() {
    // Cargar del localStorage si el administrador ha modificado productos
    const [listaProductos] = useState(() => {
        const guardados = localStorage.getItem('productos_sonidovivo');
        return guardados ? JSON.parse(guardados) : itemsProductos;
    });

    const [categoriaActiva, setCategoriaActiva] = useState('Todas');
    const [busqueda, setBusqueda] = useState('');

    // Extraer categorías únicas dinámicamente de la lista activa
    const categorias = useMemo(() => {
        const lista = listaProductos.map(p => p.categoria);
        return [...new Set(lista)];
    }, [listaProductos]);

    // Filtrar por texto y por categoría
    const productosFiltrados = useMemo(() => {
        return listaProductos.filter(p => {
            const coincideCat = categoriaActiva === 'Todas' || p.categoria === categoriaActiva;
            const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                                     p.descripcion.toLowerCase().includes(busqueda.toLowerCase());
            return coincideCat && coincideBusqueda;
        });
    }, [listaProductos, categoriaActiva, busqueda]);

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