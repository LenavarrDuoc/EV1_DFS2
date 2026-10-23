// src/views/AdminDashboardView.jsx
import { useState, useEffect } from 'react';
import { itemsProductos as productosIniciales } from '../data/productos';

function AdminDashboardView() {
    // Cargar catálogo desde localStorage o desde la lista inicial
    const [productos, setProductos] = useState(() => {
        const guardados = localStorage.getItem('productos_sonidovivo');
        return guardados ? JSON.parse(guardados) : productosIniciales;
    });

    const [productoEditar, setProductoEditar] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        categoria: 'Guitarras',
        precio: '',
        imagen: '',
        descripcion: '',
        caracteristicas: ''
    });

    // Guardar siempre cambios en localStorage
    useEffect(() => {
        localStorage.setItem('productos_sonidovivo', JSON.stringify(productos));
    }, [productos]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNuevoProducto = () => {
        setProductoEditar(null);
        setFormData({
            nombre: '',
            categoria: 'Guitarras',
            precio: '',
            imagen: '',
            descripcion: '',
            caracteristicas: ''
        });
        setMostrarFormulario(true);
    };

    const handleEditarClick = (prod) => {
        setProductoEditar(prod.id);
        setFormData({
            nombre: prod.nombre,
            categoria: prod.categoria,
            precio: prod.precio,
            imagen: prod.imagen,
            descripcion: prod.descripcion,
            caracteristicas: Array.isArray(prod.caracteristicas) 
                ? prod.caracteristicas.join(', ') 
                : prod.caracteristicas || ''
        });
        setMostrarFormulario(true);
    };

    const handleEliminarClick = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este producto del catálogo?")) {
            setProductos(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convertir string de características a un arreglo
        const caracteristicasArray = formData.caracteristicas
            ? formData.caracteristicas.split(',').map(c => c.trim()).filter(Boolean)
            : [];

        if (productoEditar) {
            // Actualizar producto existente
            setProductos(prev => prev.map(p => {
                if (p.id === productoEditar) {
                    return {
                        ...p,
                        ...formData,
                        caracteristicas: caracteristicasArray
                    };
                }
                return p;
            }));
            alert("Producto actualizado correctamente.");
        } else {
            // Crear nuevo producto
            const nuevoId = Date.now();
            const nuevoProducto = {
                id: nuevoId,
                ...formData,
                caracteristicas: caracteristicasArray
            };
            setProductos(prev => [...prev, nuevoProducto]);
            alert("Producto creado con éxito.");
        }

        setMostrarFormulario(false);
    };

    return (
        <main>
            <section id="admin-dashboard">
                <div className="admin-encabezado">
                    <h2>Panel de Administración de Productos</h2>
                    {!mostrarFormulario && (
                        <button 
                            type="button" 
                            className="btn-guardar"
                            onClick={handleNuevoProducto}
                        >
                            + AGREGAR PRODUCTO
                        </button>
                    )}
                </div>

                {mostrarFormulario && (
                    <div className="admin-form-container">
                        <h3>{productoEditar ? 'Editar Producto' : 'Crear Nuevo Producto'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-form-grid">
                                <div className="admin-form-field">
                                    <label>Nombre del Producto:</label>
                                    <input 
                                        type="text" 
                                        name="nombre" 
                                        required 
                                        value={formData.nombre} 
                                        onChange={handleChange} 
                                    />
                                </div>

                                <div className="admin-form-field">
                                    <label>Categoría:</label>
                                    <select 
                                        name="categoria" 
                                        value={formData.categoria} 
                                        onChange={handleChange}
                                    >
                                        <option value="Guitarras">Guitarras</option>
                                        <option value="Bajos">Bajos</option>
                                        <option value="Teclados">Teclados</option>
                                        <option value="Baterías">Baterías</option>
                                        <option value="Accesorios">Accesorios</option>
                                    </select>
                                </div>

                                <div className="admin-form-field">
                                    <label>Precio (formato $999.990):</label>
                                    <input 
                                        type="text" 
                                        name="precio" 
                                        required 
                                        placeholder="$199.990"
                                        value={formData.precio} 
                                        onChange={handleChange} 
                                    />
                                </div>

                                <div className="admin-form-field">
                                    <label>URL de Imagen:</label>
                                    <input 
                                        type="text" 
                                        name="imagen" 
                                        required 
                                        placeholder="https://..."
                                        value={formData.imagen} 
                                        onChange={handleChange} 
                                    />
                                </div>

                                <div className="admin-form-field full-width">
                                    <label>Descripción:</label>
                                    <textarea 
                                        name="descripcion" 
                                        rows="3" 
                                        required 
                                        value={formData.descripcion} 
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="admin-form-field full-width">
                                    <label>Características (separadas por comas):</label>
                                    <input 
                                        type="text" 
                                        name="caracteristicas" 
                                        placeholder="Cuerpo de aliso, Mástil de arce, 22 trastes"
                                        value={formData.caracteristicas} 
                                        onChange={handleChange} 
                                    />
                                </div>

                                <div className="admin-form-actions">
                                    <button 
                                        type="button" 
                                        className="btn-cancelar"
                                        onClick={() => setMostrarFormulario(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn-guardar">
                                        {productoEditar ? 'Guardar Cambios' : 'Crear Producto'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                <div className="admin-tabla-container">
                    <table className="tabla-productos">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(prod => (
                                <tr key={prod.id}>
                                    <td>
                                        <img src={prod.imagen} alt={prod.nombre} className="tabla-img" />
                                    </td>
                                    <td><strong>{prod.nombre}</strong></td>
                                    <td>{prod.categoria}</td>
                                    <td>{prod.precio}</td>
                                    <td>
                                        <div className="acciones-cell">
                                            <button 
                                                type="button" 
                                                className="btn-editar"
                                                onClick={() => handleEditarClick(prod)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn-borrar"
                                                onClick={() => handleEliminarClick(prod.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default AdminDashboardView;