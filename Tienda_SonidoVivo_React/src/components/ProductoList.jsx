import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductoService from '../services/ProductoService';

const ProductoList = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        ProductoService.getAllProductos()
            .then(response => setProductos(response.data))
            .catch(error => console.log('Error fetching Productos:', error));
    }, []);

    return (
        <div>
            <h2>Nuestro Catálogo</h2>
            <div className="catalogo-grid">
                {productos.map(producto => (
                    <div key={producto.id} className="producto-card">
                        <h3>{producto.nombre}</h3>
                        <p>${producto.precio}</p>
                        {/* En vez de Editar/Eliminar, el cliente va al Detalle */}
                        <Link to={`/producto/${producto.id}`}>Ver Detalle</Link>
                        <button>Agregar al Carrito</button> 
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductoList;