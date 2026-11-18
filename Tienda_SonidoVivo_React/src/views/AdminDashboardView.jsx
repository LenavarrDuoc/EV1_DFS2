// src/views/AdminDashboardView.jsx
import { useState, useEffect, useRef } from 'react';
import ProductoService from '../services/ProductoService';

function AdminDashboardView() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [productoEditar, setProductoEditar] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [archivoImagen, setArchivoImagen] = useState(null);

    // Referencia al formulario para hacer scroll suave y dar foco al editar
    const formContainerRef = useRef(null);
    const nombreInputRef = useRef(null);

    // Estado para el ajuste de stock en línea dentro de la misma columna de Stock
    const [stockInline, setStockInline] = useState({
        productoId: null,
        operacion: 'INGRESO',
        cantidad: 1
    });

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        caracteristicas: '',
        precio: '',
        stock: '',
        activo: true,
        idCategoriaProducto: 1
    });

    const cargarProductos = () => {
        ProductoService.getAllProductos()
            .then(res => setProductos(res.data))
            .catch(err => console.error("Error al cargar productos", err));
    };

    useEffect(() => {
        cargarProductos();
        ProductoService.getAllCategorias()
            .then(res => setCategorias(res.data))
            .catch(err => console.error("Error al cargar categorías", err));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const enfocarFormulario = () => {
        setTimeout(() => {
            formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            nombreInputRef.current?.focus();
        }, 50);
    };

    const handleNuevoProducto = () => {
        setProductoEditar(null);
        setArchivoImagen(null);
        setFormData({
            nombre: '',
            descripcion: '',
            caracteristicas: '',
            precio: '',
            stock: '',
            activo: true,
            idCategoriaProducto: categorias.length > 0 ? categorias[0].idCategoriaProd : 1
        });
        setMostrarFormulario(true);
        enfocarFormulario();
    };

    const handleEditarClick = (prod) => {
        setProductoEditar(prod.id);
        setArchivoImagen(null);

        const catEncontrada = categorias.find(c => c.nombreCategoriaProd === prod.categoriaProducto);

        setFormData({
            nombre: prod.nombre,
            descripcion: prod.descripcion,
            caracteristicas: Array.isArray(prod.caracteristicas) ? prod.caracteristicas.join(', ') : '',
            precio: prod.precio,
            stock: prod.stock,
            activo: prod.activo === 'Disponible' || prod.activo === true,
            idCategoriaProducto: catEncontrada ? catEncontrada.idCategoriaProd : (categorias[0]?.idCategoriaProd || 1)
        });
        setMostrarFormulario(true);
        enfocarFormulario();
    };

    const handleEliminarClick = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este producto de la base de datos?")) {
            ProductoService.deleteProducto(id)
                .then(() => cargarProductos())
                .catch(err => console.error(err));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const caracteristicasArray = formData.caracteristicas
            ? formData.caracteristicas.split(',').map(c => c.trim()).filter(Boolean)
            : [];

        if (caracteristicasArray.length === 0) {
            alert("Debes ingresar al menos una característica (separadas por coma).");
            return;
        }

        const payload = {
            nombre: formData.nombre.trim(),
            descripcion: formData.descripcion.trim(),
            caracteristicas: caracteristicasArray,
            precio: parseInt(formData.precio, 10),
            stock: parseInt(formData.stock, 10),
            activo: Boolean(formData.activo),
            idCategoriaProducto: parseInt(formData.idCategoriaProducto, 10)
        };

        try {
            let productoGuardado;

            if (productoEditar) {
                const prodActual = productos.find(p => p.id === productoEditar);
                const payloadUpdate = {
                    ...payload,
                    imagenUri: prodActual?.imagenUri || null
                };
                const res = await ProductoService.updateProducto(productoEditar, payloadUpdate);
                productoGuardado = res.data;
            } else {
                const res = await ProductoService.createProducto(payload);
                productoGuardado = res.data;
            }

            if (archivoImagen && productoGuardado?.id) {
                await ProductoService.uploadImagen(productoGuardado.id, archivoImagen);
            }

            alert(productoEditar ? "Producto actualizado correctamente" : "Producto creado exitosamente");
            setArchivoImagen(null);
            cargarProductos();
            setMostrarFormulario(false);
        } catch (err) {
            console.error("Error guardando producto:", err.response?.data || err);
            alert("Error al guardar el producto. Revisa que los datos sean válidos y que tengas sesión de admin.");
        }
    };

    // --- LÓGICA PARA EL STOCK EN LÍNEA (PATCH /api/v1/productos/{id}/stock -> ProductoStockUpdateDTO) ---
    const handleAjustarStock = (e) => {
        e.preventDefault();

        const cantidadAbsoluta = Math.abs(parseInt(stockInline.cantidad, 10));
        if (!cantidadAbsoluta || cantidadAbsoluta <= 0) {
            alert("Ingresa una cantidad válida mayor a 0.");
            return;
        }

        const payloadStock = {
            cantidadAjuste: stockInline.operacion === 'INGRESO' ? cantidadAbsoluta : -cantidadAbsoluta
        };

        ProductoService.updateStock(stockInline.productoId, payloadStock)
            .then(() => {
                alert("Inventario ajustado correctamente");
                setStockInline({ productoId: null, operacion: 'INGRESO', cantidad: 1 });
                cargarProductos();
            })
            .catch(err => {
                console.error("Error ajustando stock:", err.response?.data || err);
                alert("No se pudo ajustar el stock (verifica que el stock resultante no sea negativo).");
            });
    };

    return (
        <main>
            <section id="admin-dashboard">
                <div className="admin-encabezado">
                    <h2>Panel de Administración de Productos</h2>
                    {!mostrarFormulario && (
                        <button type="button" className="btn-guardar" onClick={handleNuevoProducto}>
                            + AGREGAR PRODUCTO
                        </button>
                    )}
                </div>

                {/* Formulario Principal (Crear/Editar) */}
                {mostrarFormulario && (
                    <div className="admin-form-container" ref={formContainerRef}>
                        <h3>{productoEditar ? 'Editar Producto' : 'Crear Nuevo Producto'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-form-grid">
                                <div className="admin-form-field">
                                    <label>Nombre del Producto (3 a 100 caracteres):</label>
                                    <input
                                        ref={nombreInputRef}
                                        type="text"
                                        name="nombre"
                                        minLength="3"
                                        maxLength="100"
                                        required
                                        value={formData.nombre}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="admin-form-field">
                                    <label>Categoría:</label>
                                    <select name="idCategoriaProducto" value={formData.idCategoriaProducto} onChange={handleChange}>
                                        {categorias.map(cat => (
                                            <option key={cat.idCategoriaProd} value={cat.idCategoriaProd}>
                                                {cat.nombreCategoriaProd}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="admin-form-field">
                                    <label>Precio CLP (Entero, sin $ ni puntos):</label>
                                    <input type="number" min="1" step="1" name="precio" required placeholder="199990" value={formData.precio} onChange={handleChange} />
                                </div>

                                <div className="admin-form-field">
                                    <label>Stock:</label>
                                    <input type="number" name="stock" required min="0" value={formData.stock} onChange={handleChange} />
                                </div>

                                <div className="admin-form-field">
                                    <label>Imagen del Producto (JPG, PNG, WEBP):</label>
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={(e) => setArchivoImagen(e.target.files[0])}
                                    />
                                </div>

                                <div className="admin-form-field">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
                                        <input
                                            type="checkbox"
                                            name="activo"
                                            checked={formData.activo}
                                            onChange={handleChange}
                                        />
                                        Producto Disponible / Activo
                                    </label>
                                </div>

                                <div className="admin-form-field full-width">
                                    <label>Descripción:</label>
                                    <textarea name="descripcion" rows="3" required value={formData.descripcion} onChange={handleChange} />
                                </div>

                                <div className="admin-form-field full-width">
                                    <label>Características (obligatorio, separadas por comas):</label>
                                    <input
                                        type="text"
                                        name="caracteristicas"
                                        required
                                        placeholder="Cuerpo de aliso, Mástil de arce, 22 trastes"
                                        value={formData.caracteristicas}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="admin-form-actions">
                                    <button type="button" className="btn-cancelar" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                                    <button type="submit" className="btn-guardar">{productoEditar ? 'Guardar Cambios' : 'Crear Producto'}</button>
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
                                <th>Stock</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(prod => (
                                <tr key={prod.id}>
                                    <td>
                                        <img
                                            src={prod.imagenUri || '/placeholder-instrumento.png'}
                                            alt={prod.nombre}
                                            className="tabla-img"
                                        />
                                    </td>
                                    <td><strong>{prod.nombre}</strong></td>
                                    <td>{prod.categoriaProducto || 'Sin Cat'}</td>
                                    <td>${Number(prod.precio).toLocaleString('es-CL')}</td>
                                    <td>
                                        {stockInline.productoId === prod.id ? (
                                            <form onSubmit={handleAjustarStock} className="d-flex align-items-center gap-1 flex-wrap">
                                                <span className="fw-bold me-1">{prod.stock}</span>
                                                <select
                                                    value={stockInline.operacion}
                                                    onChange={(e) => setStockInline({ ...stockInline, operacion: e.target.value })}
                                                    style={{ padding: '2px 4px' }}
                                                >
                                                    <option value="INGRESO">+</option>
                                                    <option value="EGRESO">-</option>
                                                </select>
                                                <input
                                                    type="number"
                                                    required
                                                    min="1"
                                                    autoFocus
                                                    value={stockInline.cantidad}
                                                    onChange={(e) => setStockInline({ ...stockInline, cantidad: e.target.value })}
                                                    style={{ width: '60px', padding: '2px 4px' }}
                                                />
                                                <button type="submit" className="btn-guardar" style={{ padding: '3px 8px', fontSize: '0.8rem' }}>
                                                    Confirmar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-cancelar"
                                                    style={{ padding: '3px 8px', fontSize: '0.8rem' }}
                                                    onClick={() => setStockInline({ productoId: null, operacion: 'INGRESO', cantidad: 1 })}
                                                >
                                                    X
                                                </button>
                                            </form>
                                        ) : (
                                            prod.stock
                                        )}
                                    </td>
                                    <td>{prod.activo}</td>
                                    <td>
                                        <div className="acciones-cell">
                                            <button type="button" className="btn-editar" onClick={() => handleEditarClick(prod)}>Editar Datos</button>
                                            <button
                                                type="button"
                                                className="btn-editar"
                                                onClick={() => setStockInline({ productoId: prod.id, operacion: 'INGRESO', cantidad: 1 })}
                                            >
                                                Ajustar Stock
                                            </button>
                                            <button type="button" className="btn-borrar" onClick={() => handleEliminarClick(prod.id)}>Eliminar</button>
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