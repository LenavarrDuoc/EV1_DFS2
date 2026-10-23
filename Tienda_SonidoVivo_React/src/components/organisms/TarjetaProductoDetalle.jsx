import { useState } from 'react';
import InformacionAdicional from '../molecules/InformacionAdicional';
import BotonAgregarCarrito from '../atoms/BotonAgregarCarrito';

function DetalleProductoCard({ producto }) {
    const [cantidad, setCantidad] = useState(1);

    const handleCantidadChange = (e) => {
        const val = parseInt(e.target.value, 10);
        setCantidad(isNaN(val) || val < 1 ? 1 : val);
    };

    return (
        <div className="producto-detalle">
            <div className="producto-detalle-imagen">
                <img src={producto.imagen} alt={producto.nombre} />
            </div>

            <div className="producto-detalle-info">
                <span className="producto-categoria">{producto.categoria}</span>
                <h1>{producto.nombre}</h1>
                <p className="producto-descripcion">{producto.descripcion}</p>
                <p className="producto-precio-detalle">{producto.precio}</p>

                <InformacionAdicional caracteristicas={producto.caracteristicas} />

                <div className="producto-accion">
                    <label htmlFor="cantidad">Cantidad:</label>
                    <input 
                        type="number" 
                        id="cantidad" 
                        min="1" 
                        value={cantidad} 
                        onChange={handleCantidadChange} 
                    />
                    {/* Le pasamos la cantidad seleccionada en el input */}
                    <BotonAgregarCarrito producto={producto} cantidad={cantidad} />
                </div>
            </div>
        </div>
    );
}

export default DetalleProductoCard;