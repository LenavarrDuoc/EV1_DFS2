function FiltroBusquedaCategorias({ 
    categorias, 
    categoriaActiva, 
    onSeleccionarCategoria, 
    busqueda, 
    onBusquedaChange 
}) {
    return (
        <div className="filtro-contenedor">
            <input 
                type="text" 
                placeholder="Buscar por nombre o descripción..." 
                value={busqueda} 
                onChange={(e) => onBusquedaChange(e.target.value)}
                className="input-busqueda"
            />

            <div className="filtro-categorias-grupo">
                <button
                    type="button"
                    className={`btn-filtro ${categoriaActiva === 'Todas' ? 'activo' : ''}`}
                    onClick={() => onSeleccionarCategoria('Todas')}
                >
                    Todas
                </button>
                {categorias.map((cat, idx) => (
                    <button
                        key={idx}
                        type="button"
                        className={`btn-filtro ${categoriaActiva === cat ? 'activo' : ''}`}
                        onClick={() => onSeleccionarCategoria(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FiltroBusquedaCategorias;