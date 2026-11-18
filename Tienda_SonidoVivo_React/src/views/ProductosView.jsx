import { useState, useMemo, useEffect } from 'react';
//import { itemsProductos } from '../data/productosData'; //reemplazado por ProductoService.
import ProductoService from '../services/ProductoService';
import FiltroBusquedaCategorias from '../components/molecules/FiltroBusquedaCategorias';
import GaleriaProductos from '../components/organisms/GaleriaProductos';

function ProductosView() {
    // Cargar del localStorage si el administrador ha modificado productos
    /*const [listaProductos] = useState(() => {
        const guardados = localStorage.getItem('productos_sonidovivo');
        return guardados ? JSON.parse(guardados) : itemsProductos;
    });*/ //Reemplazado por la carga desde el backend con ProductoService.

    const [categoriaActiva, setCategoriaActiva] = useState('Todas');
    const [busqueda, setBusqueda] = useState('');

    const [listaProductos, setListaProductos] = useState([]); // Inicia vacío
    const [cargando, setCargando] = useState(true); // Para mostrar un "Cargando..."

    // Efecto para buscar los datos reales al cargar la página
    useEffect(() => {
        ProductoService.getAllProductos()
            .then(response => {
                setListaProductos(response.data); // Tu backend devuelve los productos aquí
                setCargando(false);
            })
            .catch(error => {
                console.error("Error al cargar productos:", error);
                setCargando(false);
            });
    }, []); // El array vacío significa que se ejecuta solo una vez al abrir la página

    // Extraer categorías únicas dinámicamente de la lista activa
    // Se actualiza p.categoria por p.categoriaProducto para coincidir con ProductoResponseDTO del backend
    const categorias = useMemo(() => {
        const lista = listaProductos.map(p => p.categoriaProducto).filter(Boolean);
        return [...new Set(lista)];
    }, [listaProductos]);

    // Filtrar por texto y por categoría
    // Se actualiza p.categoria por p.categoriaProducto para que el filtro funcione con el DTO del backend
    const productosFiltrados = useMemo(() => {
        return listaProductos.filter(p => {
            const coincideCat = categoriaActiva === 'Todas' || p.categoriaProducto === categoriaActiva;
            const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                                     p.descripcion.toLowerCase().includes(busqueda.toLowerCase());
            return coincideCat && coincideBusqueda;
        });
    }, [listaProductos, categoriaActiva, busqueda]);

    if (cargando) return <p>Cargando catálogo...</p>;

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