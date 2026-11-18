import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductoService from '../services/ProductoService';

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        ProductoService.getProductoById(id)
            .then(response => setProducto(response.data))
            .catch(error => console.log('Error fetching producto', error));
    }, [id]);

    if (!producto) return <div>Cargando...</div>;

    return (
        <div>
            <h2>{producto.nombre}</h2>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Descripción:</strong> {producto.descripcion}</p>
            
            {/* Aquí iría tu lógica del carrito en lugar de un botón de "Guardar" o "Actualizar" */}
            <button>Agregar al Carrito</button>
        </div>
    );
};

export default ProductoDetalle;