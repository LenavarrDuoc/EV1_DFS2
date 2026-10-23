import { useState } from 'react';

function InformacionAdicional({ caracteristicas = [] }) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="producto-adicional">
            <button 
                type="button" 
                className="btn-toggle-info"
                onClick={() => setVisible(!visible)}
            >
                {visible ? 'OCULTAR INFORMACIÓN ADICIONAL' : 'MOSTRAR INFORMACIÓN ADICIONAL'}
            </button>

            {visible && (
                <div className="informacion-adicional">
                    <h2>Características del producto:</h2>
                    <ul>
                        {caracteristicas.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default InformacionAdicional;